import create from "zustand";
import { Store } from "../../../../types/newton";

const useNewtonStore = create<Store>((set) => ({
  component: {
    name: null,
    props: {},
  },

  stack: [],
  navigating: false,

  setNavigating: (navigating: boolean) => set({ navigating }),

  setComponent: (name, props) =>
    set((state) => ({
      component: { name, props },
      stack: [...state.stack, { name, props }],
    })),
}));

export default useNewtonStore;
