import React from 'react';
import {NavLink} from 'react-router-dom';
import {Form, FormGroup, NavItem, Input, Button} from 'reactstrap';
import { connect } from 'react-redux';
import api from './api';

export default function Nav2(props) {

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Tasks</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/users" exact={true} activeClassName="active" className="nav-link">Users</NavLink>
        </NavItem>
      </ul>
    </nav>
  );
}
