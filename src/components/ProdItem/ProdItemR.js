import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import PricePanel from '../../components/PricePanel';
import theme from '../../theme';


export default function ProdItemR({price, title, cover_img, stock, onPress}) {
  console.log( price, title, cover_img, stock, onPress )
  
  return(
    <TouchableOpacity style={styles.CardWrap} onPress={onPress}>
      <View style={[styles.Card, styles.CardWrapR]}>
        <Image source={{uri: cover_img[0]}} style={[styles.img, styles.imgR]} />
        <View style={styles.CardR}>
          <Text style={styles.title}>{title}</Text>
          <View style={{width:'80%',marginTop:10,flexDirection:'row',alignItems:'flex-end'}}>
            <PricePanel price={price} color={theme.primaryColor} size={18} />
            <Text style={{color:'#888',marginLeft: 8}}>库存{stock}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
