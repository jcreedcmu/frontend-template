import { Point } from "./lib/types";

export type Action =
  | { t: 'connect' }
  | { t: 'mouseDown', p_in_canvas: Point }
  | { t: 'side-effect' }
  ;

export type Dispatch = (action: Action) => void;
