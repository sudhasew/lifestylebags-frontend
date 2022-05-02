import axios from "axios";

export function signUp(
  first_name: string,
  last_name: string,
  email: string,
  password: string
) {
  return axios
    .post(`http://localhost:3000/signup/`, {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
    })
    .then((response) => response.data);
}

export function logIn(email: string, password: string) {
  return axios
    .post(`http://localhost:3000/login/`, {
      email: email,
      password: password,
    })
    .then((response) => response.data);
}

export function fetchCustomer(id: number) {
  return axios
    .get(`http://localhost:3000/customer/${id}`, {})
    .then((response) => response.data);
}
