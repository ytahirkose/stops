import axios from 'axios';
import Cookie from "js-cookie";
import config from '../../config';
import {
  requestHandler,
  successHandler,
  errorHandler
} from '../interceptors';

const BASE_URL = config?.BASE_URL

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  Accept: 'application/json, text/plain, */*',
  AccessControlAllowOrigin: '*',
  Authorization: `Bearer ${Cookie.get('sessionToken')}`
});

// Handle request process
axiosInstance.interceptors.request.use(
  (request) => requestHandler(request));
// Handle response process
axiosInstance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);
