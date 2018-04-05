import React from 'react';
import {NavLink} from 'react-router-dom';
import {Form, FormGroup, NavItem, Input, Button} from 'reactstrap';
import { connect } from 'react-redux';
import api from './api';

let LoginForm = connect(({login}) => {return {login};})((props) => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }

  function create_token(ev) {
    api.submit_login(props.login);
    console.log(props.login);
  }

  return <div className="navbar-brand">
    <Form inline>
      <FormGroup>
        <Input type="email" name="email" placeholder="email"
               value={props.login.email} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Input type="password" name="pass" placeholder="password"
               value={props.login.pass} onChange={update} />
      </FormGroup>
      <Button onClick={create_token} type="button" className="btn btn-primary">Log In</Button>
    </Form>
  </div>;
});

let Session = connect(({token}) => {return {token};})((props) => {

  function nullify_token(ev){
    props.dispatch({type: 'CLEAR_TOKEN'});
    props.dispatch({type: 'CLEAR_LOGIN_FORM'});
  }

  return <div className="navbar-brand">
    User: { props.token.name }
    <Button onClick={nullify_token} color="danger">Log Out</Button>
  </div>;
});

function Nav(props) {
  let session_info;

  if (props.token) {
    session_info = <Session token={props.token} />;
  }
  else {
    session_info = <LoginForm />
  }

  return (
    <nav className="navbar navbar-dark bg-dark ">
      <span className="navbar-brand">
        Task Tracker
      </span>
      <div id="log">
        { session_info }
      </div>
    </nav>
  );
}

function state2props(state) {
  return {
    token: state.token,
  };
}

export default connect(state2props)(Nav);
