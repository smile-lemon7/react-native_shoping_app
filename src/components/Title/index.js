import { View, Text } from 'react-native';
import React from 'react';
import styles from './style.js';

export default function({title, bgColor, color}) {
  return (
    <View style={styles.wrap}>
      <Text style={{width: 90,height:'100%',textAlign:'center',zIndex:10,paddingLeft:10,paddingRight:10,position:'absolute',top:'20%',left:'40%',backgroundColor: bgColor,color: color}}>{title}</Text>
      <View style={styles.line}></View>
    </View>
  )
}