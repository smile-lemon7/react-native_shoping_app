import request from '../utils/request';
import { formatImageUrl } from '../utils/utils';


function query_recommend() {
  return request(`/api/commend/productions/`, {headers: {"Content-Type": 'application/json'}}).then(({ data: recommend_products })=>{
    recommend_products.forEach( item => {
      item.cover_img = JSON.parse(item.cover_img).map(itm => (formatImageUrl(itm)))
    });
    return {data: recommend_products}
  })
}

function query_product({id}) {
  return request(`/api/production/info/${id}/`, {headers: {"Content-Type": 'application/json'}}).then(({ data: product })=>{
    product = product[0];
    product.cover_img = JSON.parse(product.cover_img).map(item => (formatImageUrl(item)))
    product.content = JSON.parse(product.content).map(item => (formatImageUrl(item)))
    product.sameProducts.forEach(item => {
      item.cover_img = JSON.parse(item.cover_img).map(itm => (formatImageUrl(itm)))
    })
    return {data: product}
  })
}

export default {
  query_recommend,
  query_product

}