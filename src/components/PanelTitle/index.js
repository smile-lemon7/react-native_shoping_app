import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import icon from '../../fontConf';

export default function PanelContainer({title, subTitle, onClick}){
  return (
   <View style={styles.title}>
    <Text>{title}</Text>
    <TouchableHighlight onPress={onClick} underlayColor={'transparent'}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={styles.subTitle}>{subTitle}</Text>
        <Text style={{fontFamily: 'Iconfont', color:'#666', fontSize: 22,marginTop:2,color:'#888'}}>{icon('youjiantou')}</Text>
      </View>
    </TouchableHighlight>
   </View>
  )}


const styles = StyleSheet.create({
  title: {
    borderBottomWidth: 1,
    borderColor: '#f1f1f1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
  },
  subTitle: {
    color: '#888',
    fontWeight: '300',
  }
})