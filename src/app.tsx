import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { doEffect } from './effect';
import { ExampleCanvas } from './example-canvas';
import { extractEffects } from './lib/extract-effects';
import { useEffectfulReducer } from './lib/use-effectful-reducer';
import { reduce } from './reduce';
import { mkState } from './state';

export type AppProps = {
  color: string,
};

export function App(props: AppProps): JSX.Element {
  const [state, dispatch] = useEffectfulReducer(mkState(), extractEffects(reduce), doEffect);
  const { id } = state;
  return <>

    <div className='outerDiv'>
      <div className='innerDiv'>
        <button onMouseDown={(e) => { }}>Host</button><br />
        <div className='sep' />
        <br />
        <button onMouseDown={(e) => { }}>Connect</button>
      </div>
    </div>
  </>;
}

export function init() {
  const props: AppProps = {
    color: '#f0f',
  };
  const root = createRoot(document.querySelector('.app')!);
  root.render(<App {...props} />);
}
