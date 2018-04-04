
  import React from 'react';
  import { Link } from 'react-router-dom';

  function User(params) {
    return <p><Link to={"/users/" + params.user.id}><span>Tasks assigned to {params.user.name}</span></Link></p>;
  }

  export default function UserList(params) {
    let users = _.map(params.users, (uu) => <User key={uu.id} user={uu} />);
    return <div>
      <h1>View Individual User Tasks</h1>
      { users }
    </div>;
  }
