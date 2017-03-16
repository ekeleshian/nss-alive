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
      <div style={containerStyle} className={'container'}>
        <img src="http://hyechat.herokuapp.com/logo.png" style={logoStyle}></img>
        <ul style={topMenuListStyle}>
          {listItems}
        </ul>
      </div>
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
  listStyle: 'none',
  display: 'flex',
};

const logoStyle = {
  width: '65px',
  marginRight: '30px',
};

const containerStyle = {
  display: 'flex',
}

const topMenuStyle = {
  display: 'flex',
  width: '100%',
  backgroundColor: '#3E424E',
  color: 'white',
  height: '5vh',
};
