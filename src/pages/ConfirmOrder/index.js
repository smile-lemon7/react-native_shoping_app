import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import styles from './style.js';
import icon from '../../fontConf';

export default class ConfirmOrder extends Component {
  static navigationOptions = {
    headerLeft: (<View style={{flexDirection: 'row',alignItems:'center'}}>
      <Text 
        onPress={() => alert('This is a button!')} 
        style={{fontFamily:'Iconfont',fontSize:22,color:'#fff'}}
      >
        {icon('zuojiantou')}
      </Text>
      <Text style={{color:'#fff',fontSize: 16}}>确认订单</Text>
    </View>)

  };

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View style={[styles.container]}>
        <Text style={styles.loginTitle}>确认订单</Text>
      </View>
    );
  }
}
