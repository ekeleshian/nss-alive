import React, { Component } from 'react';
import { Link } from 'react-router';
import routes from '../http-routes';

const ui = routes.ui_routes;

export default

class MainBody extends Component {
  constructor() {
    super();
    this.state = { language: 'eng', city: 'whatever' };
  }

  render() {
    return(
      <div>
        <div className={'container'}>
          <div style={dateRangeContainer}></div>
          <div style={sliderRangeContainer}></div>
          <div style={mainGraphContainer}></div>
          <div style={otherGraphsContainer}></div>
        </div>
      </div>
    );
  }
}

const baseVH = 5;
const dateRangeContainer = {
  height: `${baseVH}vh`,
};

const sliderRangeContainer = {
  height: `${2 * baseVH}vh`,
  borderBottom: '2px solid #E1E1E2',
};

const mainGraphContainer = {
  height: `${5 * baseVH}vh`,
  borderBottom: '2px solid #DBDCDE',
};

const otherGraphsContainer = {
  height: `${10 * baseVH}vh`,
}
