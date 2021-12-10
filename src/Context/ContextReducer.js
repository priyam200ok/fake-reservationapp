export const LOGGED_IN = "LOGGED_IN";
export const LOGGED_OUT = "LOGGED_OUT";
export const ADD_USER = "ADD_USER";
export const LOGGED_USER = "LOGGED_USER";
export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return { ...state, signedIn: true };
    case LOGGED_OUT:
      return { ...state, signedIn: false, loggedUsers: {} };
    case ADD_USER:
      return { ...state, users: action.users };
    case LOGGED_USER:
      return { ...state, loggedUsers: action.loggedUsers };
    default:
      return state;
  }
};
