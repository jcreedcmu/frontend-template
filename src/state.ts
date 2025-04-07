import { Effect } from "./effect";
import { Peer } from "peerjs";

export type GameState = {

};

export type AppState =
  | {
    t: 'initializing',
    effects: Effect[],
    id: string,
  }
  | {
    t: 'server_waiting_for_client',
    peer: Peer,
    effects: Effect[],
    id: string,
  }
  | { t: 'server', id: string, peer: Peer, game: GameState, effects: Effect[] }
  | { t: 'client', id: string, serverId: string, peer: Peer, game: GameState, effects: Effect[] }
  ;

export function mkState(): AppState {
  const idKey = 'id';
  if (localStorage[idKey] == undefined) {
    localStorage[idKey] = crypto.randomUUID();
  }
  const id = localStorage[idKey];
  return { t: 'initializing', effects: [], id };
}
