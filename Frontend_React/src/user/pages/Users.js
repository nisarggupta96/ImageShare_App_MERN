import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {

  const USERS = [
    { id: 'u1', image: 'https://dummyimage.com/200', name: 'name1', places: 1 },
    { id: 'u2', image: 'https://dummyimage.com/200', name: 'name2', places: 2 },
  ];

  return <UsersList items={USERS} />;
}

export default Users;
