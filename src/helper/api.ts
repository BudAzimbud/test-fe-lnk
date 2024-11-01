import axios from "axios";
export const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});


api.interceptors.request.use(async (req) => {
  req.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
  return req;
});

api.interceptors.response.use(async(res) => {
  if(res.status === 401){
    localStorage.removeItem('token');
  }
  return res;
})
