import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

export default function PricePanel({price, color, size, oth_size}) {
  const curr_price_integer = String(price).split('.')[0];
  const curr_price_decimal = String(price).split('.')[1] ? String(price).split('.')[1]: '00';
  return(
    <View style={styles.price}>
      <Text style={{color:color, fontSize: oth_size, marginTop:4}}>￥</Text>
      <Text style={{color:color, fontSize: size}}>{curr_price_integer}.</Text>
      <Text style={{color:color, fontSize: oth_size, marginTop:4}}>{curr_price_decimal}</Text>
    </View>
  )
}