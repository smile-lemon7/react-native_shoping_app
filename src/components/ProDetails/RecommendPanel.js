import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './RecommendPanel_style';


export default class RecommendPanel extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View style={[styles.container]}>
        <Text style={styles.loginTitle}>推荐</Text>
      </View>
    );
  }
}
