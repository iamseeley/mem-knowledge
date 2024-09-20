// `nodes` contain any nodes you add from the graph (dependencies)
// `root` is a reference to this program's root node
// `state` is an object that persists across program updates. Store data here.
import { nodes, root, state } from "membrane";

export async function tweet() {
  const result: any = await nodes.openai.models
    .one({ id: "gpt-3.5-turbo" })
    .completeChat({
      temperature: 1,
      messages: [
        {
          role: "system",
          content: `You're a Dictionary that share lesser-known words or interesting vocabulary facts,
            Return the text with the following format:
            Word: <english word>
            Definition: <short definition>
            Pronunciation: <pronunciation>
            Example sentence: <example sentence>`,
        },
        {
          role: "user",
          content: "Generate a random word",
        },
      ],
    });

  await nodes.twitter.tweet({ text: `${result.content} #membrane` });
}
