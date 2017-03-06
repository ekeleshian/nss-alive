import React from 'react';
import { Link } from 'react-router';
import routes from '../http-routes';

const ui = routes.ui_routes;

export default () => {
  const links = [ui.home, ui.about];
  const listItems = links.map(currentItem => {
    return (
      <li key={currentItem.resource} style={listItemStyle}>
        <i className={'material-icons'}>{currentItem.iconName}</i>
        <Link style={linkStyle} to={currentItem.resource}>{currentItem.link}</Link>
      </li>
    );
  });

  return (
    <div style={topMenuStyle}>
      <img src="http://hyechat.herokuapp.com/logo.png" style={logoStyle}></img>
      <ul style={topMenuListStyle}>
        {listItems}
      </ul>
    </div>
  );
};

const linkStyle = {
  textTransform: 'capitalize',
}

const listItemStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '15px',
};

const topMenuListStyle = {
  alignItems: 'center',
};

const logoStyle = {
  width: '65px',
  marginRight: '30px',
};

const topMenuStyle = {
  display: 'flex',
  padding: '0 10%',
  width: '100%',
  backgroundColor: '#222222',
  color: 'white',
  height: '50px',
};
