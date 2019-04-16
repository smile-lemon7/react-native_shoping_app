import request from '../utils/request';


function query_all({user_id}) {
  return request(`/api/get/address/${user_id}/`, {headers: {"Content-Type": 'application/json'}})
}

function add(params) {
  return request(`/api/add/address/`, { 
    method: 'POST',
    body: JSON.stringify(params),
  });
}

function edit(params) {
  const { user_id, id} = params;
  delete params.user_id;
  delete params.id;
  return request(`/api/put/address/${id}/user/${user_id}/`, { 
    method: 'PUT',
    body: JSON.stringify(params),
  });
}

export default {
  query_all,
  add,
  edit,
}