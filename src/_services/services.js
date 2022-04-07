import  glovalService  from './global'
function getServices() {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('t')}` 
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  };

  return fetch(`${process.env.VUE_APP_BACKEND}/api/services/`, requestOptions)
  .then(glovalService.handleResponse);
}

export const ServicesService = {
  getServices
};
