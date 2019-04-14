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
        <Text style={styles.loginTitle}>我的</Text>
      </View>
    );
  }
}
