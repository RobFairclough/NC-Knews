import axios from 'axios';
const BASE_URL = 'https://ncknewsrob.herokuapp.com/';

// auth
axios.defaults.headers.common['Authorization'] =
  'Bearer ' + localStorage.getItem('token');

const postData = async (url, body) => {
  console.log(`sending api request - POST url ${url}`, body);
  try {
    const { data } = await axios.post(`${BASE_URL}${url}`, body);
    return data;
  } catch (err) {
    return err;
  }
};

const fetchData = async url => {
  try {
    console.log(`sending api request - GET url ${url}`);
    const { data } = await axios.get(`${BASE_URL}${url}`);
    return data;
  } catch (err) {
    return { err };
  }
};
const patchData = async (url, body) => {
  try {
    console.log(`sending api request - PATCH url ${url}`);
    const data = await axios.patch(`${BASE_URL}${url}`, body);
    return data;
  } catch (err) {
    return { err };
  }
};

export { postData, fetchData, patchData };
