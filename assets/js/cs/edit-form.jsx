import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import api from './api';

import { connect } from 'react-redux';

function EditForm(params) {

  function update(ev) {
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    params.dispatch(action);
  }

  function assign(task){
    let action = {
      type: 'UPDATE_FORM',
      data: {completed: task.completed,
              task_description: task.task_description,
              task_name: task.task_name,
              time_taken: task.time_taken,
              user_id: task.user.id}
    };
    params.dispatch(action);
  }

  function submit(ev) {
    api.edit(params.form, task.id);
    params.dispatch({type: 'CLEAR_FORM'});
    api.request_tasks();
  }

  let users = _.map(params.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);

  let task = params.tasks[0];

  if(params.form.user_id == "" ){
    assign(task);
  }


  return <div style={ {padding: "4ex"} }>
    <FormGroup id="EditForm">
    <FormGroup>
      <Label for="user_id">Assign to:</Label>
      <Input type="select" name="user_id" value={params.form.user_id} onChange={update}>
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
      <option value="Pending">Pending</option>
      <option value="Complete">Complete</option>
      </Input>
    </FormGroup>
    <Link to={"/"}><Button onClick={submit} color="primary">Update</Button></Link>
    </FormGroup>
  </div>;
}

function state2props(state) {
  return { form: state.form,
           users: state.users,};
}

export default connect(state2props)(EditForm);
