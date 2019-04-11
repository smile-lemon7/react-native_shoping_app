import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './style.js';
import globalStyle from '../../../globalStyle.js';

export default class MinePage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View style={[styles.container]}>
        <Text style={styles.loginTitle}>首页</Text>
      </View>
    );
  }
}
