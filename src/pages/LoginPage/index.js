import React, { Component } from 'react';
import { Text, View, TextInput, Button, ActivityIndicator } from 'react-native';
import { AsyncStorage } from "react-native";
import styles from './style.js';
import globalStyle from '../../../globalStyle.js';
import user from '../../models/user.js';
import Loading from '../../components/Loading';

export default class LoginPage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      code: '',
      inpCode: '',
    }
  }

  async componentWillMount() {
    // await AsyncStorage.setItem("logined", 'false');
    let logined = await AsyncStorage.getItem("logined");
    this.setState({logined})
    logined==='true'? this.props.navigation.navigate('layout') : null;
  }

  saveCode = ({ code }) => {
    this.setState({code})
  }
  
  render() {
    const { inpCode, code, phone, logined } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex:1}}>
        {logined==='true'?<Loading />:
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
                    onPress={()=>user.effects.login({code, inpCode, phone, navigate})} 
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
        }
      </View>
    );
  }
}
