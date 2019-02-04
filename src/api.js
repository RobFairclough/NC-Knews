import axios from 'axios';
const BASE_URL = 'https://ncknewsrob.herokuapp.com/';

const postData = async (url, body) => {
  console.log(url, body);
  const { data } = await axios.post(`${BASE_URL}${url}`, body);

  return data;
};

const fetchData = async url => {
  console.log(url);
  const { data } = await axios.get(`${BASE_URL}${url}`);
  return data;
};

export { postData, fetchData };
