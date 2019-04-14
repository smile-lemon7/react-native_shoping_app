import React from 'react';
import icon from '../../fontConf';
import { View, Text } from 'react-native';
import styles from './style.js';

export default function ProdCount({count, onAdd, onReduce}) {
  return(
    <View style={styles.count}>
      <Text style={[{fontFamily:'Iconfont',fontSize:24,color:'#999'}, styles.L]} onPress={onReduce}>{icon('iconfontmove')}</Text>
      <View style={styles.C}>
        <Text>{count?count: 1}</Text>
      </View>
      <Text style={[{fontFamily:'Iconfont',fontSize:24,color:'#999'}, styles.L, styles.R]} onPress={onAdd}>{icon('iconfontadd')}</Text>
    </View>
  )
}