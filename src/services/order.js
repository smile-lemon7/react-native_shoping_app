import request from '../utils/request';
import { formatImageUrl } from '../utils/utils';

function submit(params) {
  return request(`/api/add/order/`, { 
    method: 'POST',
    body: JSON.stringify(params),
  });
}

function pay({id}) {
  return request(`/api/alipay/`, { 
    method: 'POST',
    body: JSON.stringify({order_id: id}),
  });
}

export default {
  submit,
  pay
}