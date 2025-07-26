import axios from 'axios';
import {getBaseUrl} from '../constants';
// import store from '../store/store';

// const token = store.getState().authentication.isAccessToken;

const axiosClient = axios.create();

axiosClient.defaults.baseURL = getBaseUrl();
// axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

axiosClient.defaults.withCredentials = true;

export function getRequest(URL) {
  return axiosClient.get(`/${URL}`).then(response => response);
}

export function postRequest(URL, payload) {
  return axiosClient.post(`/${URL}`, payload).then(response => response);
}

export function patchRequest(URL, payload) {
  return axiosClient.patch(`/${URL}`, payload).then(response => response);
}

export function deleteRequest(URL) {
  return axiosClient.delete(`/${URL}`).then(response => response);
}
