import { Point } from "./lib/types";
import { AppState } from "./state";

export type Action =
  | { t: 'connect' }
  | { t: 'mouseDown', p_in_canvas: Point }
  | { t: 'side-effect' }
  | { t: 'setAppState', state: AppState }
  ;

export type Dispatch = (action: Action) => void;
