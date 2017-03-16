import React, { Component } from 'react';
import { Link } from 'react-router';
import routes from '../http-routes';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  makeWidthFlexible,
  LineSeries,
  VerticalBarSeries,
  DiscreteColorLegend,
  Crosshair
} from 'react-vis';
import * as d3 from 'd3';

const FlexibleXYPlot = makeWidthFlexible(XYPlot);

export default
class MainGraph extends Component {
  constructor() {
    super();
    this.state = {
      crosshairValues: [],
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
   const {series} = this.state;
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
    const {series, crosshairValues} = this.state;
    return(
      <div className={'graph1'} style={this.props.style}>
        <DiscreteColorLegend
          onItemClick={this.legendClickHandler}
          width={180}
          items={series}
        />
        <FlexibleXYPlot
          animation
          onMouseLeave={this.mouseLeaveHandler}
          height={300}>
          <HorizontalGridLines />
          <YAxis className="y-axis"/>
          <XAxis className="x-axis"/>
          <VerticalBarSeries
            data={series[1].data}
            onNearestX={this.nearestXHandler}
            {...(series[1].disabled ? {opacity: 0.2} : null)}
          />
          <LineSeries
            data={series[0].data}
            curve="curveMonotoneX"
            {...(series[0].disabled ? {opacity: 0.2} : null)}
            />
          <Crosshair
            itemsFormat={this.formatCrosshairItems}
            titleFormat={this.formatCrosshairTitle}
            values={crosshairValues}
          />
        </FlexibleXYPlot>
        <button className="click-me" onClick={this.updateGraph}>
          Click to update
        </button>
      </div>
    );
  }
}
