import  glovalService  from './global'
function getServices() {
  const requestOptions = {
    method: 'GET'
  };

  return fetch(`/api/services/`, requestOptions)
  .then(glovalService.handleResponse);
}

export const ServicesService = {
  getServices
};
