import axios from "axios";

export const login = (id) => {
  axios
    .patch(`http://localhost:3000/users/${id}`, { isloggedin: true })
    .then((response) => {
      return response;
    });
};
export const logout = (id) => {
  axios
    .patch(`http://localhost:3000/users/${id}`, { isloggedin: false })
    .then((response) => response);
};
export const getUsers = (id) => {
  axios.get("http://localhost:3000/users").then((response) => response.data);
};
