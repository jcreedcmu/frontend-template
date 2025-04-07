import { Dispatch } from "./action";
import { AppState } from "./state";

export type Effect =
  | { t: 'alert' }
  ;

export function doEffect(state: AppState, dispatch: Dispatch, effect: Effect): void {
  switch (effect.t) {
    case 'alert': {

    } break;
  }
}
