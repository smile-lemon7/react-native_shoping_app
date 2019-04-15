import request from '../utils/request';
import { formatImageUrl } from '../utils/utils';

function addCart(params) {
  return request(`/api/add/shop/cart/`, { 
    method: 'POST',
    body: JSON.stringify(params),
  });
}

function query({user_id}) {
  return request(`/api/get/shop/carts/${user_id}/`, {headers: {"Content-Type": 'application/json'}}).then( ({data:list}) => {
    list.forEach(item => {
      item.cover_img = JSON.parse(item.cover_img).map(itm => (formatImageUrl(itm)));
      item.counts = item.number;
    })
    return {data: list};
  })
}

export default {
  addCart,
  query,
}