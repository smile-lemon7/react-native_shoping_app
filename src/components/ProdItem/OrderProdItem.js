import React from 'react';
import { View, Image, Text, TouchableHighlight } from 'react-native';
import styles from './style';
import PricePanel from '../../components/PricePanel';
import theme from '../../theme';

export default function OrderProdItem({id, price, title, cover_img, stock, counts, onDetails, type}) {
  return (
    <View>
      {type==='orderDetails'?
      <TouchableHighlight onPress={()=>onDetails({prd_id: id})} underlayColor={'transparent'}>
        <View style={[styles.Card, styles.CardWrapR, styles.OrderProdWrap]}>
          <Image source={{uri: cover_img[0]}} style={[styles.img, styles.imgR, styles.OrderProdImg]} />
          <View style={[styles.CardR, styles.ProdCardR]}>
            <Text style={[styles.title, {width: '80%'}]}>{title}</Text>
            <View style={{width:'80%',marginTop:10,flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between'}}>
              <PricePanel price={price} color={theme.tbColor} size={18} />
              <Text style={{color:'#888',marginLeft: 8}}>库存{stock}</Text>
              <Text style={{color:'#888',marginLeft: 8}}>x{counts}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>:
      <View style={[styles.Card, styles.CardWrapR, styles.OrderProdWrap, {marginTop:0}]}>
        <Image source={{uri: cover_img[0]}} style={[styles.img, styles.imgR, styles.OrderProdImg]} />
        <View style={[styles.CardR, styles.ProdCardR]}>
          <Text style={[styles.title, {width: '80%'}]}>{title}</Text>
          <View style={{width:'80%',marginTop:10,flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between'}}>
            <PricePanel price={price} color={theme.tbColor} size={18} />
            <Text style={{color:'#888',marginLeft: 8}}>库存{stock}</Text>
            <Text style={{color:'#888',marginLeft: 8}}>x{counts}</Text>
          </View>
        </View>
      </View>
      }
    </View>
    
    
  )
}