// `nodes` contain any nodes you add from the graph (dependencies)
// `root` is a reference to this program's root node
// `state` is an object that persists across program updates. Store data here.
import { nodes, root, state } from "membrane";

export const Root = {
  status: () => {
    if (!state.discordUrl && !state.repository) {
      return "Please set the Discord url and Repository with [configure](:configure)";
    } else {
      return "Ready";
    }
  },
};

export async function configure({ discordUrl, repo }) {
  const [user, repository] = repo.split("/");
  if (!discordUrl) {
    throw new Error("Discord webhook url is required");
  }
  if (!user || !repository) {
    throw new Error("repo is required with format user/repository");
  }

  // save discord webhook url and repo/user to state
  state.discordUrl = discordUrl;
  state.repository = repository;
  state.user = user;

  await nodes.github.users
    .one({ name: user })
    .repos.one({ name: repository })
    .pushes.$subscribe(root.handleCommit);
}

export async function handleCommit(_, { event }) {
  const res = await event.commit.$query(
    `{ message, html_url, author { login } }`
  );

  const body = {
    username: "Github alert",
    avatar_url:
      "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    content: `${res.author.login} pushed to ${state.user}/${state.repository}: \n - ${res.message} (${res.html_url})`,
  };

  await fetch(state.discordUrl, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
