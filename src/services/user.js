import request from '../utils/request';

function login(params) {
  return request(`/api/user/login/`, { 
    method: 'POST',
    body: JSON.stringify(params),
  });
}

function queryCode(params) {
  return request(`/sendsms`, { 
    method: 'POST',
    body: JSON.stringify(params),
  });
}



export default {
  login,
  queryCode,
}