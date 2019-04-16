import request from '../utils/request';
import { formatImageUrl } from '../utils/utils';

function query() {
  return request(`/api/add/get/procls/`, {headers: {"Content-Type": 'application/json'}})
}

function query_classes_item({cls_id}) {
  return request(`/api/get/class/pros/${cls_id}/`, {headers: {"Content-Type": 'application/json'}}).then( ({data}) => {
    if(JSON.stringify(data)!=='{}') {
      let classes_item = data[0].prods;
      classes_item.forEach(item => {
        item.cover_img = JSON.parse(item.cover_img).map(itm => (formatImageUrl(itm)));
        item.content = JSON.parse(item.content).map(itm => (formatImageUrl(itm)));
      })
      return {data: {id: data[0].cls_id, name: data[0].name, prods: classes_item }}
    }else {
      return {data: {}}
    }
  })
}

export default {
  query,
  query_classes_item
}