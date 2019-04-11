import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { AsyncStorage } from "react-native";
import styles from './style.js';
import globalStyle from '../../../globalStyle.js';
import user from '../../models/user.js';

export default class LoginPage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      code: '',
      inpCode: '',
    }
  }

  async componentDidMount() {
    let logined = await AsyncStorage.getItem("logined");
    logined==='true'? this.props.navigation.navigate('Layout') : null;
  }

  saveCode = ({ code }) => {
    this.setState({code})
  }
  
  render() {
    const { inpCode, code, phone } = this.state;
    return (
      <View style={[styles.container]}>
        <Text style={styles.loginTitle}>欢迎登录</Text>
        <TextInput
          style={styles.Inp}
          placeholder="请输入手机号"
          onChangeText={(phone) => this.setState({phone})}
        />
        <TextInput
          style={styles.Inp}
          placeholder="请输入验证码"
          onChangeText={(code) => this.setState({inpCode:code})}
        />
        {code? <View style={{width: '100%', alignItems: 'center'}}>
          {inpCode?<View style={globalStyle.btn}>
              <Button 
                title="下一步" 
                color="#fff" 
                onPress={()=>user.effects.login({code, inpCode, phone})} 
              /></View>:
            <View style={globalStyle.btn}><Button disabled title="下一步" color="#fff" /></View>
          }
          </View>:
          <View style={globalStyle.btn}>
            <Button 
              title="获取短信验证码" 
              color="#fff" 
              onPress={()=>user.effects.queryCode({phone: this.state.phone, cb: this.saveCode})}
            /></View>
        }
      </View>
    );
  }
}
