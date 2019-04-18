/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import React, {Component} from 'react';
import {Platform, StyleSheet, AsyncStorage} from 'react-native';
import LoginPage from './src/pages/LoginPage';
import { createStackNavigator, createAppContainer } from "react-navigation";
import theme from './src/theme';

import BottomBar from './src/Layout/BottomBar';
import ProductDetails from './src/pages/ProductDetails';
import ConfirmOrder from './src/pages/ConfirmOrder';
import AddressPage from './src/pages/Address';
import MyOrders from './src/pages/MyOrders';
import OrderDetails from './src/pages/OrderDetails';
import CarouselDetails from './src/pages/CarouselDetails';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <LoginPage />
//       </View>
//     );
//   }
// }


const AppNavigator = createStackNavigator({
  login: {
    screen: LoginPage
  },
  prod_detail: {
    screen: ProductDetails,
    navigationOptions:{
      header: null,
      headerBackTitle: '确认订单',
    },
  },
  layout: {
    screen: BottomBar,
    navigationOptions:{
      // header: null,
      // headerStyle: {backgroundColor: theme.primaryColor},
      // headerBackTitleStyle: {color: '#000'},
      // headerLeft: null,
    },
  },
  confirmOrder : {
    screen: ConfirmOrder,
    navigationOptions:{
      headerStyle: {backgroundColor: theme.primaryColor},
      headerBackTitleStyle: {color: '#fff'},
    },
  },
  address: {
    screen: AddressPage,
    navigationOptions:{
      headerStyle: {backgroundColor: theme.primaryColor},
      headerBackTitleStyle: {color: '#fff'},
      headerTitleStyle: {fontWeight: 'normal',color:'#fff'},
    },
  },
  myOrders: {
    screen: MyOrders,
    navigationOptions:{
      header: null,
      // headerBackTitle: '我的订单',
    },
  },
  orderDetails: {
    screen: OrderDetails,
    navigationOptions:{
      headerStyle: {backgroundColor: theme.primaryColor},
      headerBackTitleStyle: {color: '#fff'},
      headerTitleStyle: {fontWeight: 'normal',color:'#fff'},
    },
  },
  carouselDetails: {
    screen: CarouselDetails,
    navigationOptions:{
      header: null,
    },
  }

});
export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});