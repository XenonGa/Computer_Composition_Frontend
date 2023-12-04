import axios from "axios";

const request = axios.create({
    baseURL: 'http://10.134.171.236:9945/api',
    timeout: 100000,
    headers: {
      'Content-Type': 'application/json',
    }
  })

  request.interceptors.request.use(
    config => {
      var token_key = localStorage.getItem("token")
  
      if (token_key) {
        config.headers['Authorization'] = token_key;
      }
      return config;
    },
    error => {
      console.log(error)
      return Promise.reject(error);
    }
  );

export default request 