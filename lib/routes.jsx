import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import routes from './http-routes';
import TopMenu from '../lib/components/menu-top';
import Footer from '../lib/components/footer';
import MainBody from '../lib/components/layout';

const ui = routes.ui_routes;

export default (
  <div>
    <TopMenu />
    <Switch>
      <Route exact path={ui.home.resource} component={MainBody} />
      <Route path={`/:graphId`} component={MainBody} />
    </Switch>
    <Footer />
  </div>
);
