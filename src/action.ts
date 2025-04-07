import { Point } from "./lib/types";
import { AppState } from "./state";
import { DataConnection } from "peerjs";

export type Action =
  | { t: 'connect' }
  | { t: 'mouseDown', p_in_canvas: Point }
  | { t: 'side-effect' }
  | { t: 'setAppState', state: AppState }
  | { t: 'serverGetConn', conn: DataConnection }
  ;

export type Dispatch = (action: Action) => void;
