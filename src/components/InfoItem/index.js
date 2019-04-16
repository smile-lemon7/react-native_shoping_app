import React from 'react';
import { View, Text } from 'react-native';

export default function InfoItem({title, value}) {
  return(
    <View style={{marginTop: 8,maringBottom:8,flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{width:'20%',color:'#6f6c6c',fontWeight:'300'}}>{title}</Text>
      <Text style={{color:'#6f6c6c',fontWeight:'300'}}>{value}</Text>
    </View>
  )
}