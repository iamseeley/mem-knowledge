import { nodes, root, state } from "membrane";
import moment from "moment-timezone";
import * as chrono from "chrono-node";

state.nextId = state.nextId ?? 1;
state.reminders = state.reminders ?? [];

export const Root = {
  status: () => "Ready",
  find: ({ id }) => state.reminders.find((item) => item.id === id),
  reminders: () => state.reminders,
  create: async ({ text, atDate, repeat }) => {
    const id = state.nextId++;
    const timestamp = parseDate(atDate);

    state.reminders.push({ id, text, repeat, atDate });
    // Schedule the reminder notification at the given date
    root.sendNotifications({ id }).$invokeAt(timestamp);
  },
};

export async function sendNotifications({ id }) {
  // Get the reminder text
  const text = await root.find({ id }).text;
  // Query the reminder repeat and atDate
  const { repeat, atDate } = await root
    .find({ id })
    .$query(`{ repeat, atDate }`);

  // Send a SMS with the reminder text
  await nodes.sms.send({ message: text });

  if (repeat) {
    // Schedule the next reminder
    root.sendNotifications({ id }).$invokeAt(parseDate(atDate));
  }
}

export const Reminder = {
  gref: (_, { obj }) => root.find({ id: obj.id }),
  delete: (_, { self }) => {
    const { id } = self.$argsAt(root.find);
    state.reminders = state.reminders.filter((item) => item.id !== id);
  },
};

const parseDate = (humanDate) =>
  moment.tz(chrono.parseDate(humanDate), "America/Bogota").unix();
