import React, { Component } from 'react';
import { render } from 'react-dom';

const containerStyle = {
  position: 'relative',
  border: '2px solid black',
  minwidth: '76px',
  height: '15vh',
  float: 'right',
  marginRight: '20vh',
  marginTop: '-8vh'
};
const colorSelectorStyle = {
    position: 'relative',
    border: '1px solid black',
    margin: '4px',
    padding: '1px',
    width: '30px',
    height: '20px'
};
const shiftLeft = {
    float: 'left',
    margin: '4px',
    padding: '2px'
};
const topIndicStyle={
  border: '1px solid red',
  borderBottom: '3px solid red',
  margin: '0px 1px 1px 4px',
  width: '30px'
};

const SquareButton = (props)=> {
  let indicatorStyle = {
    border: '1px solid white',
    borderBottom: '3px solid white'};

  let color = {...colorSelectorStyle, 
    color: props.btnType.color,
    backgroundColor: props.btnType.color
  };

  if(props.btnState) {
    indicatorStyle = topIndicStyle;
  }

  const handler = ()=> {
    props.funcActivate(props.btnType);
  }

  return(
    <div style={shiftLeft} onClick={handler}>
      <div style={indicatorStyle}></div>
      <div style={color}>xxx</div>
    </div>
  );
}

export default
class RadioSelectorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { btnSelector: this.props.colorButtons[0] };
    this.activateButton = this.activateButton.bind(this);
  }

  activateButton(item) {
    this.setState({...this.state, btnSelector: item});
    this.props.functionColor(item.color);
  }

  render() {
    return(
      <div style={containerStyle}>
        <div>
          Select Graph Color
        </div>
        <div>
          {this.props.colorButtons.slice(1).map((b)=> 
            <SquareButton key = {b.name} btnType = {b}
                btnState = {this.state.btnSelector == b}
                funcActivate={this.activateButton} />
          )}
        </div>
      </div>
    );}
}