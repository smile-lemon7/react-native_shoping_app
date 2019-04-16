import { NativeModules } from 'react-native';
const { StatusBarManager } = NativeModules;
let statusBarHeight = 20;
StatusBarManager.getHeight(({height})=>{
  // console.log(height)  //状态栏高度
  statusBarHeight = height;
})

export default {
  primaryColor: '#13D1BE',
  tbColor: '#fcbc07',
  statusBarHeight: statusBarHeight + 4,
}