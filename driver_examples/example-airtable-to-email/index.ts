import { nodes, root, state } from "membrane";

export async function configure() {
  await nodes.table.changed.$subscribe(root.tableChanged);
}

export async function tableChanged({ event }) {
  const { fields } = await event.record.$query(`{ fields }`);
  const formattedFields = JSON.parse(fields);

  let emailBody = ["Table has been changed. Details:\n"];

  for (const fieldName in formattedFields) {
    emailBody.push(`${fieldName}: ${formattedFields[fieldName]}`);
  }

  const subject = "Important: Airtable table has been changed";
  const body = emailBody.join("\n");
  
  await nodes.email.send({ subject, body });
}