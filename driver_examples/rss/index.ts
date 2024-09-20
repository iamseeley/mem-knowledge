import { nodes, root, state } from "membrane";
import { Feed } from "feed";

// Initialize an empty object to store feeds
state.feeds = state.feeds ?? {};

export const Root = {
  tests: () => ({}),
};

export const Tests = {
  testCreateRss: async () => {
    const feedOptions = {
      title: "Test Feed",
      id: "https://example.com",
      link: "https://example.com",
      description: "Test Feed Description",
      image: "https://example.com/favicon.ico",
      copyright: new Date().getFullYear(),
    };

    await root.configure({ feedOptions, feed: "test" });

    return typeof state.feeds["test"].rss2() === "string";
  },
};

export async function configure({ feed, feedOptions }) {
  state.feeds[feed] = new Feed(feedOptions);
}

export async function addItem({ feed, item }) {
  if (state.feeds[feed]) {
    // Workaround for membrane proxy bug
    item = JSON.parse(JSON.stringify(item));
    item.date = item.date ? new Date(item.date) : new Date();
    state.feeds[feed].addItem(item);
  }
}

export async function addCategory({ feed, category }) {
  if (state.feeds[feed]) {
    state.feeds[feed].addCategory(category);
  }
}

export async function addContributor({ feed, contributor }) {
  if (state.feeds[feed]) {
    state.feeds[feed].addContributor(contributor);
  }
}

export async function endpoint(args) {
  const feed: string = args.path.slice(1);

  switch (args.path) {
    case "/":
      return JSON.stringify({
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.keys(state.feeds)),
      });
    default:
      if (state.feeds[feed]) {
        return JSON.stringify({
          status: 200,
          headers: {
            "Content-Type": "application/rss+xml",
          },
          body: state.feeds[feed].rss2(),
        });
      } else {
        return JSON.stringify({
          status: 404,
          body: "Not Found",
        });
      }
  }
}
