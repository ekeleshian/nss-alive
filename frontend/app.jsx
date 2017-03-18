import React from 'react';
import { render } from 'react-dom';
//import Application from '../lib/routes';
import routes from '../lib/routes';
import { BrowserRouter } from 'react-router-dom';

render((
  <BrowserRouter>
    {routes}
  </BrowserRouter>
), document.getElementById('container'));
