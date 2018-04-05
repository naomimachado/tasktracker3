import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from './api';

import { connect } from 'react-redux';

function RegisterForm(params) {

  function update(ev) {
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_REGISTER_FORM',
      data: data,
    };
    console.log(action);
    params.dispatch(action);
  }

  function submit(ev) {
    console.log("Should create a new user.");
    console.log(params.loginform);
    api.add_user(params.loginform);
    params.dispatch({type: 'CLEAR_REGISTER_FORM'});
  }

  return <div style={ {padding: "4ex"} }>
    <h2>Register a new User</h2>
    <FormGroup id="RegisterForm">
    <FormGroup>
      <Label for="name">Name:</Label>
      <Input type="text" name="name" value={params.loginform.name} onChange={update}/>
    </FormGroup>
    <FormGroup>
      <Label for="email">Email:</Label>
      <Input type="email" name="email" value={params.loginform.email} onChange={update}/>
    </FormGroup>
    <FormGroup>
      <Label for="pass">Pasword:</Label>
      <Input type="password" name="pass" value={params.loginform.pass} onChange={update}/>
    </FormGroup>
    <Button onClick={submit} color="secondary">Create</Button>
    </FormGroup>
  </div>;
}

function state2props(state) {
  console.log("rerender", state);
  return { form: state.form,
           users: state.users,
           loginform: state.loginform};
}

export default connect(state2props)(RegisterForm);
