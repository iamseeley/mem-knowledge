import { nodes, root } from "membrane";

interface Advice {
  advice: string;
  explanation: string;
}

interface AdviceData {
  role: string;
  content: string;
}

export function configure() {
  // Run sendAdvice every day
  root.sendAdvice.$invokeAtCron(`0 0 0 * * *`);
}

export async function sendAdvice() {
  try {
    const result: string = await nodes.openai.models
      .one({ id: "gpt-3.5-turbo" })
      .completeChat({
        temperature: 1.5,
        messages: [
          {
            role: "system",
            content:
              "You're an advice assistant for today, make sure to generate random advice for users and an explanation." +
              "Always return JSON in the shape Json<{advice: string; explanation: string}>",
          },
          {
            role: "user",
            content:
              "Give me a short advice for this day, from the best tech leaders.",
          },
        ],
      });

    const data = JSON.parse(result) as AdviceData;
    const content = JSON.parse(data.content) as Advice;

    await nodes.email.send({
      subject: "Your advice for today",
      body: `${content.advice}\n\n${content.explanation}`,
    });
  } catch (error) {
    console.error("Error occurred while generating advice:", error);
  }
}
