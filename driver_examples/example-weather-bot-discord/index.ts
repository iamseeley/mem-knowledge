// `nodes` contain any nodes you add from the graph (dependencies)
// `root` is a reference to this program's root node
// `state` is an object that persists across program updates. Store data here.
import { nodes, root, state } from "membrane";

export const Root = {
  status: () => {
    if (!state.guildId) {
      return "Please set the guildId with [configure](:configure)";
    } else {
      return "Ready";
    }
  },
};

export async function configure({ args: { guildId } }) {
  state.guildId = guildId;
  // Get the guild
  const gref = nodes.discord.guilds.one({ id: state.guildId });

  // Create the command
  await gref.createCommand({
    name: "weather",
    description: "Get the weather for a location",
    options: [
      {
        type: 3,
        description: "The city to get the weather for",
        name: "city",
      },
    ],
  });

  // Subscribe to the command
  await gref.onSlashCommand.$subscribe(root.handleEvent);
}

export async function handleEvent({ event }) {
  // token and application_id are required for followupWebhook
  const { token, application_id, options } = await event;
  const [data] = JSON.parse(options);
  const city = data.value;

  // Get the weather for the city
  const weather = await nodes.weather
    .now({ city })
    .$query(`{ temp feels_like }`);

  // Send the weather to the guild
  await nodes.discord.followUpWebhook({
    token,
    application_id,
    message: {
      content: `The weather in ${city.toUpperCase()} is ${
        weather.temp
      } degrees, but feels like ${weather.feels_like}.`,
    },
  });
}
