import { root, state } from "membrane";

// `state` is an object that persists across program updates. Store data here.
state.data = state.data ?? {};

export const Root = {
  status: async () => {
    return `${Object.keys(state.data).length} objects stored`;
  },
};

// The endpoint action is invoked whenever the program's URL endpoint is accessed
// Right-click on the program in the sidebar and "Open Endpoint URL"
export async function endpoint(args) {
  switch (args.method) {
    case "GET":
      const data = state.data[args.path];
      if (!data) {
        return JSON.stringify({ status: 404 });
      } else {
        return JSON.stringify({
          status: 200,
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        });
      }
    case "POST":
      const contentType = JSON.parse(args.headers)["content-type"];

      let value: any = undefined;
      if (contentType === "application/x-www-form-urlencoded") {
        const body = new URLSearchParams(args.body);
        value = body && Object.fromEntries(body as any);
      } else if (contentType === "application/json") {
        value = args.body && JSON.parse(args.body);
      } else {
        return JSON.stringify({
          status: 400,
          body: "Unsupported Content-Type",
        });
      }
      // Store the value and emit statusChanged so that the UI updates
      state.data[args.path] = value;
      root.statusChanged.$emit();
      return JSON.stringify({ status: 201 });
    case "DELETE":
      delete state.data[args.path];
      root.statusChanged.$emit();
      return JSON.stringify({ status: 200 });
    default:
      return JSON.stringify({ status: 405 });
  }
}
