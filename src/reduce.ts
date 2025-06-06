import { produce } from 'immer';
import { AppState } from './state';
import { Action } from './action';

export function reduce(state: AppState, action: Action): AppState {
  switch (action.t) {
    case 'connect': {
      return state;
    }
    case 'mouseDown': {
      return state;
    }
    case 'effect': {
      return produce(state, s => {
        s.effects.push(action.effect);
      });
    }
    case 'setAppState': {
      return action.state;
    }
    case 'serverGetConn': {
      if (state.t != 'server_waiting_for_client') {
        console.error(`invariant violation: action serverGetConn`);
        return state;
      }
      return {
        t: 'server',
        id: state.id,
        effects: [],
        game: {},
        conn: action.conn,
        peer: state.peer,
        log: [],
      }
    }
    case 'rxMessage': {
      if (!(state.t == 'server' || state.t == 'client')) {
        console.error(`invariant violation: action rxMessage`);
        return state;
      }
      return produce(state, s => {
        s.log.push(JSON.stringify(action.message))
      });
    }
  }
}
