import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import styles from './style.js';
import globalStyle from '../../../globalStyle.js';

export default class ShopingCartPage extends Component {
  static navigationOptions = {
    title: '购物车',
    tabBarIcon: ({focused}) => {
      const icon = focused
          ? require('../../assets/shoping_cart_selected.png')
          : require('../../assets/shoping_cart.png');
      return <Image source={icon} style={{height: 22, width: 22}}/>;
    },
  };
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View style={[styles.container]}>
        <Text style={styles.loginTitle}>购物车</Text>
      </View>
    );
  }
}
