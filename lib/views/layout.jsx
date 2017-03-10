import React, { Component } from 'react';
import { Link } from 'react-router';
import routes from '../http-routes';
import { LineChart } from 'rd3'
import * as d3 from 'd3';

const ui = routes.ui_routes;

export default

class MainBody extends Component {
  constructor() {
    super();
    this.state = {
      chart1: [{name: '', values: [
                {x: 1, y: 1},
                {x: 2, y: 2},
                {x: 3, y: 0},
                {x: 4, y: 3},
                {x: 5, y: 2},
                {x: 6, y: 3},
                {x: 7, y: 4},
                {x: 8, y: 4},
                {x: 9, y: 1},
                {x: 10, y: 5},
                {x: 11, y: 0},
                {x: 12, y: 1},
                {x: 13, y: 1},
                {x: 14, y: 4},
                {x: 15, y: 4},
                {x: 16, y: 5},
                {x: 17, y: 5},
                {x: 18, y: 5},
                {x: 19, y: 1},
                {x: 20, y: 0},
                {x: 21, y: 1},
                {x: 22, y: 1}
            ]}],
      language: 'eng',
      city: 'whatever'
    };
  }

  async componentDidMount() {
    const data = await fetch('/En.json');
    const chartValuesArray = await data.json();
    const name1 = chartValuesArray[0].label
    const values1 = chartValuesArray[0].data.map((item, idx) => {
      return {x: idx, y: item};
    });
    const name2 = chartValuesArray[1].label
    const values2 = chartValuesArray[1].data.map((item, idx) => {
      return {x: idx, y: item};
    });
    const chart1 = [
      {name: name1, values: values1},
      {name: name2, values: values2, strokeWidth: 3, strokeDashArray: '5,5'}
    ];
    this.setState({chart1})
  }

  render() {
    return(
      <div>
        <div className={'container'}>
          <div style={dateRangeContainer}></div>
          <div style={sliderRangeContainer}></div>
          <div className={'graph1'} style={mainGraphContainer}>
            <LineChart
              legend={true}
              data={this.state.chart1}
              width={'100%'}
              height={400}
              viewBoxObject={{
                x: 0,
                y: 0,
                width: 1000,
                height: 400
              }}
              title="Armenia as it is"
              yAxisLabel="Money"
              xAxisLabel="Year"
              yAxisLabelOffset={60}
              domain={{x:[], y:[0,3500]}}
              xAccessor={d => {
                return 2002 + d.x/4
              }}
              xAxisFormatter={d => {
                return `${Math.floor(d)}Q${((d - Math.floor(d))/0.25+1)}`
              }}
              xAxisTickCount={30}
              xAxisClassName={'x-axis'}
              gridHorizontal={true}
            />
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
