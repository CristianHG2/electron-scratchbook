export type Route<T = any, R = any>  = {
  view: string;
  action: (payload?: T) => (R | Promise<R>);
}

export const action = <
  Action extends (...args: any) => any,
  Payload = Parameters<Action>,
  Response = ReturnType<Action>,
>(
  view: string,
  action: Action
): Route<Payload, Response> => ({view, action});
