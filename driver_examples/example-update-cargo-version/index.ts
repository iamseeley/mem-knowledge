// `nodes` contain any nodes you add from the graph (dependencies)
// `root` is a reference to this program's root node
// `state` is an object that persists across program updates. Store data here.
import { nodes, root, state } from "membrane";
import toml from "@iarna/toml";

export async function configure({ args: { repository } }) {
  const [user, repo] = repository.split("/");

  const ref = await nodes.github.users
    .one({ name: user })
    .repos.one({ name: repo });

  state.ref = ref;
  state.repo = repo;
}

export async function endpoint({ args }) {
  switch (args.path) {
    case "/update":
      const body = new URLSearchParams(args.body);
      const version = body.get("version");
      const file = "Cargo.toml";
      const repo = state.ref;

      const { content } = await repo.content
        .file({ path: file })
        .$query("{ content }");

      const parsedToml: any = toml.parse(content);
      parsedToml.package.version = version;
      const newFile = toml.stringify(parsedToml);

      const parent: any = await repo.branches.one({ name: "main" }).commit.sha;

      // create a new tree with the updated file
      const tree: any = await repo.createFileTree({
        base: parent,
        path: file,
        content: newFile,
      });

      // create a new commit with the updated tree
      const commit: any = await repo.commits.create({
        message: `Update ${file}`,
        tree,
        parents: parent,
      });

      // update the main branch with the new commit
      await repo.branches
        .one({ name: "main" })
        .update({ sha: commit, ref: "heads/main" });

      if (commit) {
        console.log(`Updated ${state.repo} to version ${version}`);
      }
  }
  return JSON.stringify({ status: 200 });
}
