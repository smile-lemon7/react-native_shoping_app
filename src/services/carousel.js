import request from '../utils/request';
import { formatImageUrl } from '../utils/utils';


function query_carousel() {
  return request(`/api/get/carousels/`, {headers: {"Content-Type": 'application/json'}}).then(({ data: list })=>{
    list.forEach( item => {
      item.cover_img = formatImageUrl(item.cover_img);
    });
    return {data: list}
  })
}

export default {
  query_carousel,
}