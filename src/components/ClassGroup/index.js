import React from 'react';
import { FlatList } from 'react-native';

import ClsProdItem from '../../components/ProdItem/ClsProdItem';

export default function ClassGroup({classItem: {cls_id, name, prods}, onProdDetails}) {
  console.log( prods )
  prods = prods.map(itm => ({...itm, onPress: ()=>onProdDetails({prd_id: itm.id})}))
  return <FlatList 
    numColumns={2}
    // columnWrapperStyle={{justifyContent:'space-around'}}
    columnWrapperStyle={{justifyContent:'space-between',width:'80%',paddingLeft:'2%',paddingRight:'4%'}}
    data={prods}
    renderItem={({item}) => <ClsProdItem key={item.id} {...item} />}
  />
}