import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import Nav from './nav';
import Tasks from './tasks';
import UserList from './user-list';
import TaskForm from './form';


export default function task_init(store) {
  let root = document.getElementById('root');
  ReactDOM.render(
    <Provider store={store}>
      <Task />
      </Provider>,
      root);
}

let Task = connect((state) => state)((props) => {

    return(
      <Router>
        <div>
          <Nav />
          <div className="row">
            <Route path="/" exact={true} render={() =>
                <div className="col">
                  <p>&nbsp;</p>
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
                        <Tasks tasks={_.filter(props.tasks, (tt) =>  match.params.user_id == tt.user.id)} />
                      </div>
                    }
                    />

          </div>
        </div>
      </Router>
    );
});
