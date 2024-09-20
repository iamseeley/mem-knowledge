// `nodes` contain any nodes you add from the graph (dependencies)
// `root` is a reference to this program's root node
// `state` is an object that persists across program updates. Store data here.
import { nodes, root, state } from "membrane";

export async function configure({ slackUrl, repo }) {
  const [user, repository] = repo.split("/");
  if (!slackUrl) {
    throw new Error("Slack webhook url is required");
  }
  if (!user || !repository) {
    throw new Error("repo is required with format user/repository");
  }

  // save slack webhook url and repo/user to state
  state.slackUrl = slackUrl;
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
    text: `${res.author.login} pushed to ${state.user}/${state.repository}: \n - ${res.message} (${res.html_url})`,
  };

  await fetch(state.slackUrl, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
