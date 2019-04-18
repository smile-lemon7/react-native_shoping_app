import Toast from 'react-native-root-toast';
import { isPhoneNum } from '../utils/utils.js';
import { AsyncStorage } from "react-native"
import userServices from '../services/user.js';
import { getmyDate } from '../utils/utils';




export default {
  effects: {
    async queryCode({phone, cb}){
      if( phone && isPhoneNum(phone)) {
        const {data} = await userServices.queryCode({phone});
        // cb({'code': '1234'})
        cb(data)
      }else {
        Toast.show('手机号不存在',{position: Toast.positions.CENTER,})
      }
    },
    async login({code, inpCode, phone, navigate}) {
      if(code === inpCode) {
        const { data } = await userServices.login({phone});
        await AsyncStorage.setItem("logined", 'true');
        await AsyncStorage.setItem("userInfo", JSON.stringify(data));
        navigate('layout');
        await AsyncStorage.setItem("loginedTime", getmyDate());
        // await AsyncStorage.setItem("loginedTime",  '2019-4-11');
      }else {
        Toast.show('验证码输入错误',{position: Toast.positions.CENTER,})
      }
    }
  },
  
  
}