import React from 'react';
import { FlatList } from 'react-native';

import ProdItem from '../../components/ProdItem/index';

export default function ClassGroup({cls_id, name, prods}) {
  return <FlatList 
    numColumns={2}
    // columnWrapperStyle={{justifyContent:'space-around'}}
    columnWrapperStyle={{justifyContent:'space-between',width:'80%',paddingLeft:'5%',paddingRight:'2%'}}
    data={prods}
    renderItem={({item}) => <ProdItem key={item.id} {...item} />}
  />
}