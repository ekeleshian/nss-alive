import React, { Component } from 'react';
import { Link } from 'react-router';
import routes from '../http-routes';

const FlexibleXYPlot = makeWidthFlexible(XYPlot);
const ui = routes.ui_routes;

export default

class MainBody extends Component {
  constructor() {
    super();
    this.state = {
      crosshairValues: [],
      currentSeries: {title: '', disabled: false, data:[
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
      ]},
      series: [{title: 'Smth', disabled: false, data:[
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
      ]}, {title: 'Smth', disabled: false, data:[
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
      graphID: 0,
      language: 'eng',
      city: 'whatever'
    };
  }

  updateGraph = () => {
    const {series} = this.state;
    const tmp = series[0];
    series[0] = series[1];
    series[1] = tmp;
    this.setState({series});
  }

  nearestXHandler = (value, {index}) => {
   const {currentSeries, series} = this.state;
   this.setState({
      crosshairValues: series.map(s => s.data[index])
    });
  }

 mouseLeaveHandler = () => {
   this.setState({crosshairValues: []});
 }

 formatCrosshairTitle = (values) => {
  const x = values[0].x;
  return {
      title: 'Year',
      value: `${Math.floor(x)}/${((x - Math.floor(x))/0.25+1)}`
    };
  }

  formatCrosshairItems = (values) => {
    const {series} = this.state;
    return values.map((value, idx) => {
      return {
        title: series[idx].title,
        value: value.y
      };
    });
  }

  legendClickHandler = (item, i) => {
    const {series} = this.state;
    series[i].disabled = !series[i].disabled;
    this.setState({series});
  }

  async componentDidMount() {
    const data = await fetch('/En.json');
    const chartValuesArray = await data.json();
    const title1 = chartValuesArray[0].label
    const values1 = chartValuesArray[0].data.map((item, idx) => {
      return {x: 2002 + (idx)/4, y: item};
    });
    const title2 = chartValuesArray[1].label
    const values2 = chartValuesArray[1].data.map((item, idx) => {
      return {x: 2002 + (idx)/4, y: item};
    });
    const series = [
      {title: title1, disabled: false, data: values1},
      {title: title2, disabled: false, data: values2}
    ];
    this.setState({series})
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
