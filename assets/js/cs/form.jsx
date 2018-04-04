import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from './api';

import { connect } from 'react-redux';

function TaskForm(params) {

  function update(ev) {
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    console.log(action);
    params.dispatch(action);
  }

  function submit(ev) {
    console.log("Should create post.");
    console.log(params.form);
    api.submit_task(params.form);
    params.dispatch({type: 'CLEAR_FORM'});
  }


  let users = _.map(params.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
  return <div style={ {padding: "4ex"} }>
    <h2>Assign New Task</h2>
    <FormGroup id="TaskForm">
    <FormGroup>
      <Label for="user_id">Assign to:</Label>
      <Input type="select" name="user_id" value={params.form.user_id} onChange={update}>
        <option>Select User </option>
        { users }
      </Input>
    </FormGroup>
    <FormGroup>
      <Label for="task_name">Task Name:</Label>
      <Input type="text" name="task_name" value={params.form.task_name} onChange={update}/>
    </FormGroup>
    <FormGroup>
      <Label for="task_description">Task Description:</Label>
      <Input type="textarea" name="task_description" value={params.form.task_description} onChange={update}/>
    </FormGroup>
    <FormGroup>
      <Label for="time_taken">Time taken(in mins):</Label>
      <Input type="number" min="0" step="15" name="time_taken" value={params.form.time_taken} onChange={update}/>
    </FormGroup>
    <FormGroup>
      <Label for="completed">Completed:</Label>
      <Input type="select" name="completed" value={params.form.completed} onChange={update}>
      <option>Select Task Status </option>
      <option value="Pending">Pending</option>
      <option value="Complete">Complete</option>
      </Input>
    </FormGroup>
    <Button onClick={submit} color="primary">Assign</Button>
    </FormGroup>
  </div>;
}

function state2props(state) {
  console.log("rerender", state);
  return { form: state.form,
           users: state.users,};
}

export default connect(state2props)(TaskForm);
