import { createContext } from 'react';

export const UserContext = createContext({
  userList: [],
  update: () => {},
  delete: () => {},
  add: ()=>{}
});