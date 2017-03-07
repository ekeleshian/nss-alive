import React from 'react';
import { Link } from 'react-router';
import routes from '../http-routes';

const ui = routes.ui_routes;

export default () => {
  const links = [ui.home, ui.about];
  const listItems = links.map((currentItem, index) => {
    const needDivisor = index !== links.length - 1;
    const classname = needDivisor ? 'divisor' : '';
    return (
      <li key={currentItem.resource} style={footerListItemStyle}>
        <Link className={classname} style={linkStyle} to={currentItem.resource}>{currentItem.link}</Link>
      </li>
    );
  });

  return (
    <div style={footer}>
      <img src="http://hyechat.herokuapp.com/logo.png" style={logoStyle}></img>
      <div className={'centerV full-width'}>
        <ul style={footerItemsContainer}>
          <li style={footerListItemStyle}>
            <a className={'divisor'} style={linkStyle} href="https://github.com/iteratehackerspace/nss-alive">{'Source Code'}</a>
          </li>
          {listItems}
        </ul>
        <div style={copyright} className={'push-right'}>
          <p style={copyrightStyle}>{'© 2017 Iterate - All rights reserved'}</p>
        </div>
      </div>
    </div>
  );
};

const copyright = {
  width: '80%',
  textAlign: 'right',
}

const copyrightStyle = {
  textDecoration: 'none',
  color: '#E6E7E8',
  fontSize: '10px',
  textTransform: 'capitalize',
};

const linkStyle = {
  display: 'inline-block',
  textDecoration: 'none',
  color: '#E6E7E8',
  padding: '0 15px',
  fontSize: '10px',
  textTransform: 'capitalize',
};

const footerListItemStyle = {
  display: 'flex',
  alignItems: 'center',
};

const footerItemsContainer = {
  alignItems: 'center',
};

const logoStyle = {
  width: '65px',
  marginRight: '30px',
};

const footer = {
  display: 'flex',
  padding: '0 5%',
  width: '100%',
  backgroundColor: '#3E424E',
  color: 'white',
  height: '5vh',
};
