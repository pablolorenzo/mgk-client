import  glovalService  from './global'
function getProviders() {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('t')}` 
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  return fetch(`${process.env.VUE_APP_BACKEND}/api/service-type/`, requestOptions)
  .then(glovalService.handleResponse);
}

function getStatuses() {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('t')}` 
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  return fetch(`${process.env.VUE_APP_BACKEND}/api/service-status/`, requestOptions)
  .then(glovalService.handleResponse);
}

function addService(parameters) {
  console.log(parameters);
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('t')}` 
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      address: parameters.direccion,
      provider_id: parameters.provider,
      status_id: parameters.status,
      started_date: parameters.creation_date,
      finished_date: parameters.finished_date
    })
  };

  return fetch(`${process.env.VUE_APP_BACKEND}/api/services/`, requestOptions)
  .then(glovalService.handleResponse);
}
function addBalanceItem(parameters) {
  console.log(parameters);
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('t')}` 
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      name: parameters.name,
      pub_date: parameters.pub_date
    })
  };

  return fetch(`${process.env.VUE_APP_BACKEND}/api/balance-item/`, requestOptions)
  .then(glovalService.handleResponse);
}

function addProvider(parameters) {
  console.log(parameters);
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('t')}` 
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      service_type: parameters.service_type,
      pub_date: parameters.pub_date
    })
  };

  return fetch(`${process.env.VUE_APP_BACKEND}/api/service-type/`, requestOptions)
  .then(glovalService.handleResponse);
}

function addCost(parameters) {
  console.log(parameters);
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('t')}` 
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      sign: parameters.sign,
      value: parameters.value,
      service_id: parameters.service_id,
      item_type: parameters.item_type,     
    })
  };

  return fetch(`${process.env.VUE_APP_BACKEND}/api/balance-item-service/`, requestOptions)
  .then(glovalService.handleResponse);
}

function getBalanceType() {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('t')}` 
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  return fetch(`${process.env.VUE_APP_BACKEND}/api/balance-item/`, requestOptions)
  .then(glovalService.handleResponse);
}

export const ProviderService = {
  getProviders,
  getStatuses,
  addService,
  getBalanceType,
  addBalanceItem,
  addProvider,
  addCost
};
