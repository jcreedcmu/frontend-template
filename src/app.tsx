import * as React from 'react';
import * as ReactDOM from 'react-dom';

export type AppProps = {
};

export function App(props: AppProps): JSX.Element {
  return <>Hello, World!</>;
}

export function init() {
  const props = {};
  ReactDOM.render(<App {...props} />, document.querySelector('.app') as any);
}
