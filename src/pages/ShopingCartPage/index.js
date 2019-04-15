import React, { Component } from 'react';
import { Text, View, Image, AsyncStorage } from 'react-native';
import styles from './style.js';
import theme from '../../theme';

import cartServices from '../../services/cart';

export default class ShopingCartPage extends Component {
  static navigationOptions = {
    title: '购物车',
    tabBarIcon: ({focused}) => {
      const icon = focused
          ? require('../../assets/shoping_cart_selected.png')
          : require('../../assets/shoping_cart.png');
      return <Image source={icon} style={{height: 22, width: 22}}/>;
    },
    header: undefined,
  };
  
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  async componentWillMount() {
    const userInfo = await AsyncStorage.getItem('userInfo');
    this.setState({user_id: JSON.parse(userInfo).id});
    let { data:list } = await cartServices.query({user_id: JSON.parse(userInfo).id});
    this.setState({list, loading: false})
  }

  render() {
    return (
      <View style={[styles.container]}>
        <Text style={styles.loginTitle}>购物车</Text>
      </View>
    );
  }
}
