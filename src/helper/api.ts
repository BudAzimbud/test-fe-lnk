import axios, { AxiosError } from "axios";
export const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});


api.interceptors.request.use(async (req) => {
  return req;
});

