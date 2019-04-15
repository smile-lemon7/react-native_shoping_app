import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import styles from './style.js';
import theme from '../../theme';
import icon from '../../fontConf';

export default class ConfirmOrder extends Component {
  static navigationOptions = ({navigation}) => ({
    headerLeft: (<TouchableHighlight onPress={()=>navigation.goBack()} underlayColor={'transparent'}>
      <View style={{flexDirection: 'row',alignItems:'center'}}>
        <Text 
          style={{fontFamily:'Iconfont',fontSize:22,color:'#fff'}}
        >
          {icon('zuojiantou')}
        </Text>
        <Text style={{color:'#fff',fontSize: 16}}>确认订单</Text>
      </View>
    </TouchableHighlight>
    )
  })

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View style={[styles.container]}>
        <Text style={styles.loginTitle}>确认订单</Text>
      </View>
    );
  }
}
