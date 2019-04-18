import Toast from 'react-native-root-toast';
import { AsyncStorage, DeviceEventEmitter } from "react-native"
import cartServices from '../services/cart.js';


export default {
  effects: {
    async onCart(params) {
      if(params.address_id) {
        const { data } = await cartServices.addCart(params);
        console.log( data )
        DeviceEventEmitter.emit('addCart', data)
        Toast.show('加入购物车成功',{position: Toast.positions.CENTER})
      }else {
        Toast.show('请选择收货地址',{position: Toast.positions.CENTER})
      }
    }
  },
  
  
}