const baseUrl = '/api';
import axios from 'axios';
const signUp = (data) => {
  const request = axios.post(baseUrl + '/users', data);
  return request.then((response) => response.data);
};

const login = (data) => {
  const request = axios.post(baseUrl + '/login', data);
  return request.then((response) => response.data);
};

export default { signUp, login };
