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
    case 'side-effect': {
      return produce(state, s => {
        s.effects.push({ t: 'alert' });
      });
    }
  }
}
