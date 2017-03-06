import React from 'react';
import { render } from 'react-dom';
import TopMenu from '../lib/views/menu-top';
import Footer from '../lib/views/footer';
import MainBody from '../lib/views/layout';

const Application = ({name, handler}) => {
  return (
    <div>
      <TopMenu />
      <MainBody />
      <Footer />
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
