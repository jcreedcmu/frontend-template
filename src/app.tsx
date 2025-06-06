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

function statusMessage(message: string, more?: JSX.Element): JSX.Element {
  console.log(message);
  return <>
    <div className='outerDiv'>
      <div className='innerDiv'>
        {message}{more}
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
    peer.on('open', () => {
      console.log(`open! server peer id = ${peer.id}`);
      peer.on('connection', conn => {
        console.log('got a connection!', conn);

        conn.on('data', data => {
          console.log('server got message', data);
          dispatch({ t: 'rxMessage', message: data });
        });
        dispatch({ t: 'serverGetConn', conn });
      });
      peer.on('close', () => { console.log('server close') });
      peer.on('disconnected', () => { console.log('server disconnected') });
      peer.on('error', err => {
        console.log('err!', err);
      });
      dispatch({ t: 'setAppState', state: { t: 'server_waiting_for_client', effects: [], id, peer } });
    });
  });
  return statusMessage('Initializing...');
}

function InitClient(props: { dispatch: Dispatch, state: AppState & { t: 'initializing' }, serverId: string }): JSX.Element {
  const { state, dispatch, serverId } = props;
  const { id } = state;
  React.useEffect(() => {
    const options = { debug: 3 };
    console.log(`client id ${id}`);
    console.log(`client connecting to ${serverId}`);
    const peer = new Peer(id, options);
    peer.on('open', () => {
      console.log('client peer open');
      const conn = peer.connect(serverId);
      conn.on('open', () => {
        console.log('client connection open');
        conn.on('data', data => {
          console.log('client got message', data);
          dispatch({ t: 'rxMessage', message: data });
        });
        dispatch({ t: 'setAppState', state: { t: 'client', effects: [], id, serverId, game: {}, peer, conn, log: [] } });
      });
    });
  });
  return statusMessage('Connecting...');
}

function ServerWaiting(props: { dispatch: Dispatch, state: AppState & { t: 'server_waiting_for_client' } }): JSX.Element {
  const { state, dispatch } = props;
  const { id, peer } = state;
  const url = new URL(document.URL);
  console.log(`server id ${id}`);
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

function SendButton(props: { dispatch: Dispatch }): JSX.Element {
  function onClick() {
    props.dispatch({ t: 'effect', effect: { t: 'send', message: 'ping' } });
  }
  return <button onClick={onClick}>
    Ping
  </button>;
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
    case 'server': return statusMessage('Server ready', <><br /><SendButton dispatch={dispatch} /><pre>{state.log.join('\n')}</pre></>);
    case 'client': return statusMessage('Client ready', <><br /><SendButton dispatch={dispatch} /><pre>{state.log.join('\n')}</pre></>);
    case 'server_waiting_for_client': return <ServerWaiting dispatch={dispatch} state={state} />;
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
