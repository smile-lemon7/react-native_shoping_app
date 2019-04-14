import request from '../utils/request';


function addCart(params) {
  return request(`/api/add/shop/cart/`, { 
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export default {
  addCart,
}