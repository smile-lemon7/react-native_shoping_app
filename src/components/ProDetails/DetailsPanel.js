import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './DetailsPanel_style.js';

export default class DetailsPanel extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View style={[styles.container]}>
        <Text style={styles.loginTitle}>详情</Text>
      </View>
    );
  }
}
