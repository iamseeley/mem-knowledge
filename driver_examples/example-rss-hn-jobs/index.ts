import { nodes, root, state } from "membrane";

// Define the default feed name
const feed = "hn-jobs";

export async function configure({ args: { keywords } }) {
  // Store keywords and added story IDs in the state object
  state.keywords = keywords;
  state.addedStoryIds = new Set();

  const feedOptions = {
    title: "Hacker News Jobs",
    id: "https://news.ycombinator.com/jobs",
    link: "https://news.ycombinator.com/jobs",
    description: "Hacker News Jobs",
    image: "https://news.ycombinator.com/favicon.ico",
    copyright: new Date().getFullYear(),
  };
  // Configure the RSS feed with the provided feed options
  await nodes.rss.configure({ feedOptions, feed });
  // Schedule the watch function to run every 5 minutes
  root.watch.$cron(`0 */5 * * * *`);
}

export async function watch() {
  // Fetch the top jobs stories from the Hacker News Driver
  const topStories = await nodes.jobs.items.$query(
    `{ id text title url time }`
  );

  const keywordArray = state.keywords
    .split(",")
    .map((keyword) => keyword.toLowerCase());

  // Filter top stories based on the provided keywords
  const matchedStories = topStories.filter((story) => {
    if (!story.url) return false;
    const title = story.title?.toLowerCase();
    return keywordArray.some((keyword) => title?.includes(keyword));
  });

  // Iterate over matched stories and add them to the RSS feed
  matchedStories.forEach(async (story) => {
    const storyId = story.id!.toString();
    // If story is already added, skip it
    if (state.addedStoryIds.has(storyId)) return;

    // Add the story to the RSS feed
    await nodes.rss.addItem({
      feed,
      item: {
        title: story.title!,
        link: story.url!,
        date: new Date(story.time! * 1000),
      },
    });
    // Store the added story ID
    state.addedStoryIds.add(storyId);
  });
}
