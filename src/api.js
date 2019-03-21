import axios from 'axios';

const BASE_URL = 'https://ncknewsrob.herokuapp.com/';

// eslint-disable-next-line no-undef
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;

const postData = async (url, body) => {
  try {
    const { data } = await axios.post(`${BASE_URL}${url}`, body);
    return data;
  } catch (err) {
    return err;
  }
};
const fetchData = async (url, queries = []) => {
  try {
    const query = queries.length ? `?${queries.join('&')}` : '';
    const { data } = await axios.get(`${BASE_URL}${url}${query}`);
    return data;
  } catch (err) {
    return { err };
  }
};
const patchData = async (url, body) => {
  try {
    const { data } = await axios.patch(`${BASE_URL}${url}`, body);
    return data;
  } catch (err) {
    return { err };
  }
};
const deleteData = async (url) => {
  try {
    const { data } = await axios.delete(`${BASE_URL}${url}`);
    return data;
  } catch (err) {
    return { err };
  }
};

export {
  postData, fetchData, patchData, deleteData,
};
