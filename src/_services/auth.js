import axios from 'axios';
import  glovalService  from './global'

function getToken(data) {
    const payload = {
        username: data.email,
        password: data.password
      }
      return axios.post('https://mgk-be.herokuapp.com/api/token/', payload)
  }
  
  function refreshToken() {
    const requestOptions = {
      method: 'GET'
    };
  
    return fetch(`https://mgk-be.herokuapp.com/api/service-status/`, requestOptions)
    .then(glovalService.handleResponse);
  }



  export const AuthService = {
      getToken,
      refreshToken
  };
  