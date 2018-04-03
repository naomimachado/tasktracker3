import React from 'react';
import ReactDOM from 'react-dom';

export default function task_init() {
  let root = document.getElementById('root');
  ReactDOM.render(<Task />, root);
}

class Task extends React.Component {

  render(){
    return(
      <div>
        <p>Write the app </p>
      </div>
    );
  }

}
