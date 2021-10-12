import React, { useState, useEffect } from 'react';

import MainHeader from './shared/components/Navigation/MainHeader';
import { UserContext } from './shared/context/user-context';
import Users from './users/page/Users'

const App = () => {
  const [users, setUsers] = useState([])
  const deleteUser = id => {
    const newUser = users.filter(u => id !== u.id);
    setUsers(newUser)
  }
  const addUser = user => {
    const newUser = [...users];
    newUser.push(user);
    setUsers(newUser)
  }
  const updateUser = user => {
    const newUser = users.filter(u => user.id !== u.id);
    newUser.push(user);
    setUsers(newUser)
  }
  useEffect(() => {
    (async () => {
      const res = await fetch('https://randomuser.me/api/?results=10');
      const data = await res.json();
      setUsers(data.results.map(u => (
        {
          id: u.login.uuid,
          name: {
            title: u.name.title,
            first: u.name.first,
            last: u.name.last
          },
          email: u.email,
          location: {
            country: u.location.country,
            city: u.location.city,
            street: `${u.location.street.name} ${u.location.street.number}`
          },
          image: u.picture.medium
        }
      )))
    })();
  }, [])

  return <>
    <UserContext.Provider value={{ userList: users, update: updateUser, add: addUser, delete: deleteUser }}>
      <MainHeader />
      <main>
        <Users />
      </main>
    </UserContext.Provider>
  </>
};

export default App;
