const baseUrl = '/api';
import axios from 'axios';
const checkout = (data) => {
  const request = axios.post(baseUrl + '/create-checkout', data);
  return request.then((response) => response.data);
};

const sendDetails = (data) => {
  const request = axios.post(baseUrl + '/userDetails', data);
  return request.then((response) => response.data);
};

export default { checkout, sendDetails };
