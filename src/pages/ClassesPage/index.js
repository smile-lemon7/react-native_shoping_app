import React, { Component } from 'react';
import { Text, View, Image, AsyncStorage } from 'react-native';
import styles from './style.js';

import classesServices from '../../services/classes';

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

  async componentWillMount() {
    const userInfo = await AsyncStorage.getItem("userInfo");
    // this.setState({user_id: JSON.parse(userInfo).id})
    const { data } = classesServices.query({user_id: JSON.parse(userInfo).id});
    console.log( data )
  }

  render() {
    return (
      <View style={[styles.container]}>
        <Text style={styles.loginTitle}>分类</Text>
      </View>
    );
  }
}
