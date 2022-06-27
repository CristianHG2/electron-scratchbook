import { resolve } from "path";

const cwd = resolve(process.cwd(), "src/server/newton");

export const executeRoute = async (view: string) => {
  const directory = view.split("/");
  const target = directory.pop() ?? view;

  const routes = (await import(`./routes`)).default;

  return routes[target] ?? (() => ({ __newton_error: true }));
};
