import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import styles from './style.js';
import globalStyle from '../../../globalStyle.js';

export default class ClassesPage extends Component {
  static navigationOptions = {
    title: '分类',
    tabBarIcon: ({focused}) => {
      const icon = focused
          ? require('../../assets/classes_selected.png')
          : require('../../assets/classes.png');
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
        <Text style={styles.loginTitle}>分类</Text>
      </View>
    );
  }
}
