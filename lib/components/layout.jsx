import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import MainGraph from './maingraph';
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
    const { match } = this.props;
    const graphId = match.params.graphId || '';
    return(
      <div>
        <div className={'container'}>
          <div style={dateRangeContainer}></div>
          <div style={sliderRangeContainer}></div>
          <div style={mainGraphContainer}>
            <MainGraph graphId={graphId} />
            <Link className="click-me" to={`/ddebt`}>
              Domestic debt
            </Link>
            <Link className="click-me" to={`/gdebt`}>
              Gross debt
            </Link>
          </div>
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
