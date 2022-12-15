const url = '/api/products';
import axios from 'axios';
const getAllProducts = () => {
  return axios.get(url).then((respons) => {
    return respons.data;
  });
};

const getproduct = (id) => {
  return axios.get(`${url}/${id}`).then((response) => {
    return response.data;
  });
};

export default { getAllProducts, getproduct };
