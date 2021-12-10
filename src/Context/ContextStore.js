import { createContext, useReducer } from "react";
import { authReducer } from "./ContextReducer";
const initialState = {
  signedIn: false,
  users: {},
  loggedUsers: {},
};

export const AuthContext = createContext();
const AuthProvider = (props) => {
  const [authState, authDispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
