import React, { useContext } from 'react';

import { UserContext } from '../../shared/context/user-context';
import UsersList from '../components/UsersList';

const Users = () => {
  const userContext = useContext(UserContext);

  return <UsersList items={userContext.userList} />;
};

export default Users;
