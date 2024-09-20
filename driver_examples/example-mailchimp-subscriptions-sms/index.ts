// `nodes` contain any nodes you add from the graph (dependencies)
// `root` is a reference to this program's root node
// `state` is an object that persists across program updates. Store data here.
import { nodes, root, state } from "membrane";

export async function configure({ audienceId }) {
  const audience = await nodes.audiences.one({ id: audienceId });
  await audience.subscriptions.$subscribe(root.handler);
}

export async function handler(_, { event }) {
  const email = await event.member.email_address;
  await nodes.sms.send({
    message: `Hello! You have a new subscriber on your website. ${email}`,
  });
}
