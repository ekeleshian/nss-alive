import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../http-routes';
import RadioSelectorComponent from './colorSelector';
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

const colorButtons = [ {name: "default", color: 'rgb(18, 147, 154)'}, 
  {name: "btnGreen", color:'green'},
  {name: "btnBlue", color:'blue'},
  {name: "btnYellow", color:'yellow'},
  {name: "btnViolet", color:'violet'},];

const FlexibleXYPlot = makeWidthFlexible(XYPlot);

export default
class MainGraph extends Component {
  constructor() {
    super();
    this.state = {
      crosshairValues: [],
      series: [
        {title: 'Smth', disabled: false, data:[{x: 1, y: 1},]},
        {title: 'Smth', disabled: false, data:[{x: 1, y: 1}]}
      ],
      graphNumber: 0,
      language: 'eng',
      city: 'whatever',
      custColor: colorButtons[0].color
    };
    this.setCustomColor = this.setCustomColor.bind(this);
  }

  nearestXHandler = (value, {index}) => {
    const { series, graphNumber } = this.state;
    const currentSeries = series[graphNumber];
   this.setState({
      crosshairValues: [currentSeries.data[index]] //series.map(s => s.data[index])
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
    const { series, graphNumber } = this.state;
    const currentSeries = series[graphNumber];
    return values.map((value, idx) => {
      return {
        title: currentSeries.title,
        value: value.y
      };
    });
  }

  legendClickHandler = (item, i) => {
    const { series, graphNumber } = this.state;
    const currentSeries = series[graphNumber];
    currentSeries.disabled = !currentSeries.disabled;
    this.setState({currentSeries});
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

  componentWillReceiveProps(nextProps) {
    const { graphId } = nextProps;
    let graphNumber = 0;
    if(graphId === 'ddebt') {
      graphNumber = 1;
    }
    this.setState({graphNumber})
  }

  setCustomColor(clr) {
    this.setState({...this.state, custColor: clr});
  }

  render() {
    const {series, crosshairValues, graphNumber, custColor} = this.state;
    const currentSeries = series[graphNumber];
    return(
      <div className={'graph1'} style={this.props.style}>
        <RadioSelectorComponent 
          colorButtons={colorButtons}
          functionColor={this.setCustomColor}/>
        <DiscreteColorLegend
          onItemClick={this.legendClickHandler}
          width={180}
          items={[currentSeries]}
        />
        <FlexibleXYPlot
          animation
          onMouseLeave={this.mouseLeaveHandler}
          height={300}>
          <HorizontalGridLines />
          <YAxis className="y-axis"/>
          <XAxis className="x-axis"/>
          <LineSeries
            data={currentSeries.data}
            color={custColor}
            onNearestX={this.nearestXHandler}
            curve="curveMonotoneX"
            {...(currentSeries.disabled ? {opacity: 0.2} : null)}
          />
          <Crosshair
            itemsFormat={this.formatCrosshairItems}
            titleFormat={this.formatCrosshairTitle}
            values={crosshairValues}
          />
        </FlexibleXYPlot>
      </div>
    );
  }
}

// if you want to use vertical bars :
// <VerticalBarSeries
//   data={currentSeries.data}
//   onNearestX={this.nearestXHandler}
//   {...(currentSeries.disabled ? {opacity: 0.2} : null)}
// />
