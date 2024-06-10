export type Action =
  | { t: 'increment' }
  | { t: 'side-effect' }
  ;

export type Dispatch = (action: Action) => void;
