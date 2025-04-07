import { Effect } from "./effect";
import { Peer } from "peerjs";

export type GameState = {

};

export type AppState =
  | {
    t: 'pending_server',
    effects: Effect[],
    id: string,
  }
  | {
    t: 'pending_client',
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
  const options = { debug: 3 };

  const params = new URLSearchParams(window.location.search);
  const serverId = params.get('connect');
  if (serverId !== null) { // we're the "client"
    const peer = new Peer(id);
    peer.connect(serverId);
    return { t: 'client', effects: [], id, serverId, game: {}, peer };
  }
  else { // we're the "server"
    const peer = new Peer(id, options);
    return { t: 'server_waiting_for_client', effects: [], id, peer };
  }

}
