import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MainGraph from './maingraph'
import routes from '../http-routes';

const ui = routes.ui_routes;

export default

class MainBody extends Component {
  constructor() {
    super();
    this.state = {
      language: 'eng',
      city: 'whatever'
    };
  }
  render() {
    const {currentSeries, series, crosshairValues, graphID} = this.state;
    const otherID = (graphID + 1) % 2
    return(
      <div>
        <div className={'container'}>
          <div style={dateRangeContainer}></div>
          <div style={sliderRangeContainer}></div>
          <MainGraph style={mainGraphContainer} />
          <div style={otherGraphsContainer}></div>
        </div>
      </div>
    );
  }
}

const baseVH = 5;

const dateRangeContainer = {
  height: `${baseVH}vh`
};

const sliderRangeContainer = {
  height: `${2 * baseVH}vh`
};

const mainGraphContainer = {
  height: `${5 * baseVH}vh`
};

const otherGraphsContainer = {
  height: `${10 * baseVH}vh`
};
