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

function query({user_id}) {
  return request(`/api/get/orders/${user_id}/`, {headers: {"Content-Type": 'application/json'}}).then(({ data: list })=>{
    list.forEach( item => {
      item.orderProdArr.forEach(itm => {
        itm.cover_img = JSON.parse(itm.cover_img).map(itm => (formatImageUrl(itm)));
      })
    });
    return {data: list}
  })
}

function confirmReceive({id}) {
  return request(`/api/confirm/receipt/${id}/`, {
    headers: {"Content-Type": 'application/json'}
  })
}

function calcel({id}) {
  return request(`/api/delete/order/${id}/`, {
    headers: {"Content-Type": 'application/json'}
  })
}


function remove({id}) {
  return request(`/api/cancel/order/${id}/`, {
    method: 'DELETE',
    headers: {"Content-Type": 'application/json'}
  })
}

function queryOne({id}) {
  return request(`/api/get/orders/infos/${id}/`, {headers: {"Content-Type": 'application/json'}}).then(({ data: info })=>{
    const {address, create_at, number, order_id, status, sumprice, orderProdArr} = info[0];
    let obj = {address, create_at, number, order_id, status, sumprice};
    orderProdArr.forEach(item => {
      item.cover_img = JSON.parse(item.cover_img).map(itm => (formatImageUrl(itm)));
    })
    obj.orderProdArr = orderProdArr;
    return {data: obj}
  })
}

export default {
  submit,
  pay,
  query,
  confirmReceive,
  remove,
  calcel,
  queryOne,
}