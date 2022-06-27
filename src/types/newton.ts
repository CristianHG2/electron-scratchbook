export type View = {
  name: string | null;
  props: { [key: string]: any };
};

export type Store = {
  component: View;
  stack: View[];
  navigating: boolean;

  setComponent: (name: View["name"], props: View["props"]) => void;
  setNavigating: (navigating: boolean) => void;
};

export type Route = () => Promise<any>;

export type Routes = Record<string, Route>;
