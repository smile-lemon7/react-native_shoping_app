import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './style.js';
import globalStyle from '../../../globalStyle.js';

export default class ClassesPage extends Component {
  
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
