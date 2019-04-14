/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet} from 'react-native';
import LoginPage from './src/pages/LoginPage';
import { createStackNavigator, createAppContainer } from "react-navigation";
import BottomBar from './src/Layout/BottomBar';
import ProductDetails from './src/pages/ProductDetails';
import ConfirmOrder from './src/pages/ConfirmOrder';
import theme from './src/theme';

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
      header: null,
    },
  },
  confirmOrder : {
    screen: ConfirmOrder,
    navigationOptions:{
      headerStyle: {backgroundColor: theme.primaryColor},
      headerBackTitleStyle: {color: '#fff'},
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