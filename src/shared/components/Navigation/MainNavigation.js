import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';

import './MainNavigation.css';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import BackDrop from '../UIElements/Backdrop';

const MainNavigation = (props) => {

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDraweHandler = (newState) => {
    setDrawerOpen(newState);
  };

  return <React.Fragment>
    {drawerOpen && <BackDrop onClick={() => toggleDraweHandler(false)} />}

    <SideDrawer show={drawerOpen} onClick={() => toggleDraweHandler(false)}>
      <nav className='main-navigation__drawer-nav'>
        <NavLinks />
      </nav>
    </SideDrawer>

    <MainHeader>
      <button className='main-navigation__menu-btn' onClick={() => toggleDraweHandler(true)}>
        <span />
        <span />
        <span />
      </button>
      <h1 className='main-navigation__title'>
        <Link to='/'>Places</Link>
      </h1>
      <nav className='main-navigation__header-nav'>
        <NavLinks />
      </nav>
    </MainHeader>
  </React.Fragment>
};

export default MainNavigation;
