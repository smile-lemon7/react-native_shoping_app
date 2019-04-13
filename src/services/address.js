import request from '../utils/request';


function query_all({user_id}) {
  return request(`/api/get/address/${user_id}/`, {headers: {"Content-Type": 'application/json'}})
}

export default {
  query_all,
}