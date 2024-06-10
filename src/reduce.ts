import { produce } from 'immer';
import { AppState } from './state';
import { Action } from './action';

export function reduce(state: AppState, action: Action): AppState {
  switch (action.t) {
    case 'increment': {
      return produce(state, s => {
        s.counter++;
      });
    }
    case 'side-effect': {
      return produce(state, s => {
        s.effects.push({ t: 'alert' });
      });
    }
  }
}
