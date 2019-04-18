import request from '../utils/request';
import { formatImageUrl } from '../utils/utils';


function query_carousel() {
  return request(`/api/get/carousels/`, {headers: {"Content-Type": 'application/json'}}).then(({ data: list })=>{
    list.forEach( item => {
      item.cover_img = JSON.parse(item.cover_img).map(itm => (formatImageUrl(itm)))
    });
    return {data: list}
  })
}

function queryOne({id}) {
  return request(`/api/get/carousel/info/${id}/`, {headers: {"Content-Type": 'application/json'}}).then(({ data: carousel })=>{
    carousel.content = JSON.parse(carousel.content).map(itm => (formatImageUrl(itm)))
    return {data: carousel}
  })
}

export default {
  query_carousel,
  queryOne
}