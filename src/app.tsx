import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { doEffect } from './effect';
import { ExampleCanvas } from './example-canvas';
import { extractEffects } from './lib/extract-effects';
import { useEffectfulReducer } from './lib/use-effectful-reducer';
import { reduce } from './reduce';
import { AppState, mkState } from './state';
import { Dispatch } from './action';
import { Peer } from 'peerjs';

export type AppProps = {
  color: string,
};

function statusMessage(message: string): JSX.Element {
  console.log(message);
  return <>
    <div className='outerDiv'>
      <div className='innerDiv'>
        {message}
      </div>
    </div>
  </>
}

function InitServer(props: { dispatch: Dispatch, state: AppState & { t: 'initializing' } }): JSX.Element {
  const { state, dispatch } = props;
  const { id } = state;
  React.useEffect(() => {
    const options = { debug: 3 };
    const peer = new Peer(id, options);
    dispatch({ t: 'setAppState', state: { t: 'server_waiting_for_client', effects: [], id, peer } });
  });
  return statusMessage('Initializing...');
}

function InitClient(props: { dispatch: Dispatch, state: AppState & { t: 'initializing' }, serverId: string }): JSX.Element {
  const { state, dispatch, serverId } = props;
  const { id } = state;
  React.useEffect(() => {
    const options = { debug: 3 };
    const peer = new Peer(id);
    peer.connect(serverId);
    dispatch({ t: 'setAppState', state: { t: 'client', effects: [], id, serverId, game: {}, peer } });
  });
  return statusMessage('Connecting...');
}

export function App(props: AppProps): JSX.Element {
  const [state, dispatch] = useEffectfulReducer(mkState(), extractEffects(reduce), doEffect);
  const { id } = state;

  switch (state.t) {
    case 'initializing': {
      const params = new URLSearchParams(window.location.search);
      const serverId = params.get('connect');
      if (serverId !== null) { // we're the "client"
        return <InitClient dispatch={dispatch} state={state} serverId={serverId} />;
      }
      else {
        return <InitServer dispatch={dispatch} state={state} />;
      }
    }
    case 'server': return statusMessage('Server ready');
    case 'client': return statusMessage('Client connected');
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
