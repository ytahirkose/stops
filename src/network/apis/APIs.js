import { axiosInstance } from './index';

const handlerEnabled = false;

const createSession = async (data) => {
  const response = await axiosInstance.post(`/createSession`, data, {handlerEnabled});
  return response;
};
const getLocations = async (data) => {
  const response = await axiosInstance.get(`/getLocations/${data}`);
  return response;
};

export default {
  createSession,
  getLocations
};
