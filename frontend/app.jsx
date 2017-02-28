import React from 'react';
import { render } from 'react-dom';

const Application = ({name, handler}) => {
  return (
    <div onClick={handler}> Hello {name} </div>
  );
};

render((
  <Application
    name={'new iterate hacker'}
    handler={function(e) {
      console.log('Hello', e.target);
    }}
    />), document.getElementById('container'));
