import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { doEffect } from './effect';
import { extractEffects } from './lib/extract-effects';
import { useEffectfulReducer } from './lib/use-effectful-reducer';
import { reduce } from './reduce';
import { mkState } from './state';

export type AppProps = {
  color: string,
};

export function App(props: AppProps): JSX.Element {
  const [state, dispatch] = useEffectfulReducer(mkState(), extractEffects(reduce), doEffect);
  const { counter } = state;
  return <>
    <span style={{ color: props.color }}>Hello, World!</span><br />
    Counter Value is: {counter}<br />
    <button onMouseDown={(e) => { dispatch({ t: 'increment' }) }}>Increment</button><br />
    <button onMouseDown={(e) => { dispatch({ t: 'side-effect' }) }}>Side Effect</button><br />
  </>;
}

export function init() {
  const props: AppProps = {
    color: '#f0f',
  };
  ReactDOM.render(<App {...props} />, document.querySelector('.app') as any);
}
