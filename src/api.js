import axios from 'axios';
const BASE_URL = 'https://ncknewsrob.herokuapp.com/';

// auth
axios.defaults.headers.common['Authorization'] =
  'Bearer ' + localStorage.getItem('token');

const postData = async (url, body, token) => {
  console.log(`sending api request - POST url ${url}`, body);
  const { data } = await axios.post(`${BASE_URL}${url}`, body);

  return data;
};

const fetchData = async (url, token) => {
  try {
    console.log(`sending api request - GET url ${url}`);
    const { data } = await axios.get(`${BASE_URL}${url}`);
    return data;
  } catch (err) {
    return { err };
  }
};

export { postData, fetchData };
