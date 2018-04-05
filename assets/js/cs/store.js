import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';


function tasks(state = [], action) {
  switch (action.type) {
  case 'TASKS_LIST':
    return [...action.tasks];
  case 'ADD_TASK':
    return [action.task, ...state];
  default:
    return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
  case 'USERS_LIST':
    return [...action.users];
  case 'ADD_USER':
    return [action.user, ...state];
  default:
    return state;
  }
}

let empty_form = {
  user_id: "",
  task_name: "",
  task_description: "",
  time_taken: "",
  completed: ""
};

function form(state = empty_form, action) {
  switch (action.type) {
    case 'UPDATE_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_FORM':
      return empty_form;
    default:
      return state;
  }
}


let empty_register_login = {
  name: "",
  email: "",
  pass: "",
};

function loginform(state = empty_register_login, action) {
  switch (action.type) {
    case 'UPDATE_REGISTER_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_REGISTER_FORM':
      return empty_register_login;
    default:
      return state;
  }
}

function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;
    case 'CLEAR_TOKEN':
      return null;
    default:
      return state;
  }
}

let empty_login = {
  email: "",
  pass: "",
};

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_LOGIN_FORM':
      return empty_login;
    default:
      return state;
  }
}


function root_reducer(state0, action) {
  console.log("reducer", action);
  console.log("state0", state0);
  let reducer = combineReducers({tasks, users, form, token, login, loginform});
  console.log("afterCombine", reducer);
  let state1 = reducer(state0, action);
  console.log("state1", state1);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;
