import axios from 'axios';
import  glovalService  from './global'

function getToken(data) {
    const payload = {
        username: data.email,
        password: data.password
      }
      return axios.post(`${process.env.VUE_APP_BACKEND}/api/token/`, payload)
  }
  
  function refreshToken() {
    const requestOptions = {
      method: 'GET'
    };
  
    return fetch(`${process.env.VUE_APP_BACKEND}/api/service-status/`, requestOptions)
    .then(glovalService.handleResponse);
  }



  export const AuthService = {
      getToken,
      refreshToken
  };
  