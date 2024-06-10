import { Effect } from "./effect";

export type AppState = {
  counter: number,
  effects: Effect[],
}

export function mkState(): AppState {
  return { counter: 0, effects: [] };
}
