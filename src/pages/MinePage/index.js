import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import styles from './style.js';
import globalStyle from '../../../globalStyle.js';


export default class MinePage extends Component {
  static navigationOptions = {
    title: '我的',
    tabBarIcon: ({focused}) => {
      const icon = focused
          ? require('../../assets/mine_selected.png')
          : require('../../assets/mine.png');
      return <Image source={icon} style={{height: 24, width: 22}}/>;
    },
  };
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  onMyAddress = () => {
    this.props.navigation.navigate('address');
  }

  render() {
    return (
      <View style={[styles.container]}>
        <Text style={styles.loginTitle}>我的</Text>
        <Text style={styles.loginTitle} onPress={this.onMyAddress}>我的收货地址</Text>
      </View>
    );
  }
}
