import React from 'react';
import ReactDOM from 'react-dom';

const App = (props: any) => {
  return <div>{props.hello}</div>;
};

ReactDOM.render(<App hello="world" />, document.createElement('div'));
