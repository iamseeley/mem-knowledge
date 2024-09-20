// `nodes` contain any nodes you add from the graph (dependencies)
// `root` is a reference to this program's root node
// `state` is an object that persists across program updates. Store data here.
import { nodes, root, state } from "membrane";

export async function configure({ keywords, documentId }) {
  state.keywords = keywords;
  state.doc = nodes.docs.one({ id: documentId });
}

export async function watchJobs() {
  // Fetch top stories from the API
  const topStories = await nodes.stories.items.$query(`{ title url time }`);
  // keywords are comma separated
  const keywordArray = state.keywords
    .split(",")
    .map((keyword) => keyword.toLowerCase());

  // Filter top stories based on the provided keywords
  const matchedStories = topStories.filter((story) => {
    if (!story.url) return false;
    const title = story.title?.toLowerCase();
    return keywordArray.some((keyword) => title?.includes(keyword));
  });

  const matchedLinks = matchedStories.map((story) => {
    const date = new Date(story.time! * 1000).toLocaleDateString("en-US");
    return {
      text: `${story.title} - (${date})\n\n`,
      url: story.url,
    };
  });

  for (const link of matchedLinks) {
    await state.doc.insertLink(link);
  }
}
