import { Effect } from "./effect";
import { Peer } from "peerjs";

export type GameState = {

};

export type AppState =
  | {
    t: 'lobby',
    effects: Effect[],
    id: string,
  }
  | { t: 'server', id: string, peer: Peer, game: GameState, effects: Effect[] }
  | { t: 'client', id: string, remoteId: string, peer: Peer, game: GameState, effects: Effect[] }
  ;

export function mkState(): AppState {
  const idKey = 'id';
  if (localStorage[idKey] == undefined) {
    localStorage[idKey] = crypto.randomUUID();
  }
  return { t: 'lobby', effects: [], id: localStorage[idKey] };
}
