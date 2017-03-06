import React from 'react';
import { render } from 'react-dom';
import TopMenu from '../lib/views/menu-top';

const Application = ({name, handler}) => {
  return (
    <div>
      <TopMenu />
    </div>
  );
};

render((
  <Application
    name={'new iterate hacker'}
    handler={function(e) {
      console.log('Hello', e.target);
    }}
    />), document.getElementById('container'));
