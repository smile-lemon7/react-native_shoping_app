import React from 'react';
import { View, Text } from 'react-native';
import styles from './ItemStyle';

import Item from '../ProdItem/OrderProdItem';

export default function orderProItem({prodList}) {
  return (
    <View className={styles.panel}>
      {prodList&&prodList.map(item => (
        <View key={item.id}>
          <Item {...item} />
        </View>
      ))
      }
    </View>
  )}
