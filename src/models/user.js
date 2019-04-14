import Toast from 'react-native-root-toast';
import { isPhoneNum } from '../utils/utils.js';
import { AsyncStorage } from "react-native"
import userServices from '../services/user.js';

// let userState = {
  
// }

// const reducers = {
//   saveUserInfo({ params }) {
//     userState = {...params}
//   }
// }

export default {
  // userState,
  effects: {
    queryCode({phone, cb}){
      if( phone && isPhoneNum(phone)) {
        cb({'code': '1234'})
      }else {
        Toast.show('手机号不存在',{position: Toast.positions.CENTER,})
      }
    },
    async login({code, inpCode, phone}) {
      if(code === inpCode) {
        const { data } = await userServices.login({phone});
        // reducers.saveUserInfo({params: data});
        await AsyncStorage.setItem("logined", 'true');
        await AsyncStorage.setItem("userInfo", JSON.stringify(data));
      }else {
        Toast.show('验证码输入错误',{position: Toast.positions.CENTER,})
  
      }
    }
  },
  
  
}