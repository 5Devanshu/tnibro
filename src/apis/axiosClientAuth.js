import axios from 'axios';
import {getBaseUrl} from '../constants';
import {store} from '../store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = getBaseUrl();

axiosClient.interceptors.request.use(async function (config) {
  const token = store.getState().authentication.isAccessToken;
  let accessToken = await AsyncStorage.getItem('accessToken');
  if (!accessToken || !token) {
    return;
  }
  if (accessToken || token) {
    config.headers.Authorization = `Bearer ${token || accessToken}`;
  }
  return config;
});

// To share cookies to cross site domain, change to true.
axiosClient.defaults.withCredentials = true;

export function getRequestAuth(URL) {
  return axiosClient.get(`/${URL}`).then(response => response);
}

export function postRequestAuth(URL, payload) {
  return axiosClient.post(`/${URL}`, payload).then(response => response);
}

export function patchRequestAuth(URL, payload) {
  return axiosClient.patch(`/${URL}`, payload).then(response => response);
}

export function putRequestAuth(URL, payload) {
  return axiosClient.put(`/${URL}`, payload).then(response => response);
}

export function deleteRequestAuth(URL, payload) {
  return axiosClient.delete(`/${URL}`, {data: payload}).then(response => response);
}
