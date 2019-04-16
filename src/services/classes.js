import request from '../utils/request';
import { formatImageUrl } from '../utils/utils';

function query() {
  return request(`/api/add/get/procls/`, {headers: {"Content-Type": 'application/json'}})
}

export default {
  query
}