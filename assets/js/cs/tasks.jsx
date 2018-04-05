import React from 'react';
import {Card, CardBody, Button} from 'reactstrap';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import api from './api';

export default function Tasks(params){

  let tasks = _.map(params.tasks, (tt) => <Task key={tt.id} task={tt} />);
  return <div className="col">
    { tasks }
  </div>;
}

function Task(params){
  let task = params.task;

  function delete_task(ev){
    api.delete(task.id);
    api.request_tasks();
    api.request_tasks();
  }

  function edit_task(ev){
    api.request_tasks();
  }



  return <Card>
    <CardBody>
      <div>
        <p>Task Assigned to:{task.user.name}</p>
        <p>Task Name:{task.task_name}</p>
        <p>Task Description:{task.task_description}</p>
        <p>Task Completed:{task.completed}</p>
        <p>Time taken:{task.time_taken}(mins)</p>
        <Link to={"/tasks/" + task.id} ><Button color="primary">Edit Task</Button></Link><br/>
        <Button onClick={delete_task} color="danger">Delete Task</Button>
      </div>
    </CardBody>
  </Card>;
}
