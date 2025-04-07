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
  function status(message: string): JSX.Element {
    console.log(message);
    return <>
      <div className='outerDiv'>
        <div className='innerDiv'>
          {message}
        </div>
      </div>
    </>
  }
  switch (state.t) {
    case 'pending_server': return status('Starting game...');
    case 'pending_client': return status('Connecting...');
    case 'server': return status('Server');
    case 'client': return status('Client');
    case 'server_waiting_for_client': {
      const url = new URL(document.URL);
      url.searchParams.set('connect', id);
      return <>
        <div className='outerDiv'>
          <div className='innerDiv'>
            Waiting for other players. Send them this invite link: <br /><br />
            <a href={url.toString()}>Join the game</a>
          </div>
        </div>
      </>;
    }
  }


  /* <button onMouseDown={(e) => { }}>Host</button><br />
     <div className='sep' />
     <br />
     <button onMouseDown={(e) => { }}>Connect</button> */
}

export function init() {
  const props: AppProps = {
    color: '#f0f',
  };
  const root = createRoot(document.querySelector('.app')!);
  root.render(<App {...props} />);
}
