import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import Nav from './nav';
import Nav2 from './nav2';
import Tasks from './tasks';
import UserList from './user-list';
import TaskForm from './form';
import RegisterForm from './register';
import EditForm from './edit-form';


export default function task_init(store) {
  let root = document.getElementById('root');
  ReactDOM.render(
    <Provider store={store}>
      <Task />
      </Provider>,
      root);
}

let Task = connect((state) => state)((props) => {
    console.log("props",props);

    if (props.token == null){
      return <Router>
              <div>
                <Nav />
                  <h3>Please Login/Register</h3>
                  <RegisterForm />
                </div>
              </Router>;

    } else {
    return(
      <Router>
        <div>
          <Nav />
          <Nav2 />
          <div className="row">
            <Route path="/" exact={true} render={() =>
                <div className="col">
                  <p>&nbsp;</p>
                  <h2>Assign New Task</h2>
                  <TaskForm users={props.users}/>
                  <h1>All Tasks</h1>
                  <Tasks tasks={props.tasks}/>
                </div>
              }
              />

            <Route path="/users" exact={true} render={() =>
                <div className="col">
                  <p>&nbsp;</p>
                  <UserList users={props.users}/>
                </div>
              }
              />

            <Route path="/users/:user_id" exact={true} render={({match}) =>
              <div className="col">
                <h1>Assigned Tasks </h1>
                <Tasks tasks={_.filter(props.tasks, (tt) =>  match.params.user_id == tt.user.id)} />
              </div>
            }
            />

          <Route path="/tasks/:task_id" exact={true} render={({match}) =>
              <div className="col">
                <p>&nbsp;</p>
                <h2>Edit Task</h2>
                <EditForm tasks={_.filter(props.tasks, (tt) =>  match.params.task_id == tt.id)} />
              </div>
            }
            />

        </div>
      </div>
    </Router>
    );
  }
});
