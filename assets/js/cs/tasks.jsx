import React from 'react';
import {Card, CardBody} from 'reactstrap'

export default function Tasks(params){

  let tasks = _.map(params.tasks, (tt) => <Task key={tt.id} task={tt} />);
  return <div className="col">
    { tasks }
  </div>;
}

function Task(params){
  let task = params.task;
  return <Card>
    <CardBody>
      <div>
        <p>Task Assigned to:{task.user.name}</p>
        <p>Task Name:{task.task_name}</p>
        <p>Task Description:{task.task_description}</p>
        <p>Task Completed:{task.completed}</p>
        <p>Time taken:{task.time_taken}(mins)</p>
      </div>
    </CardBody>
  </Card>;
}
