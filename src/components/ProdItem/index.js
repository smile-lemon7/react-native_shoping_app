import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import PricePanel from '../../components/PricePanel';
import theme from '../../theme';
import FitImage from 'react-native-fit-image';


export default function ProdItem({price, title, cover_img, stock, onPress}) {
  let height = 0;
  
  return(
    <TouchableOpacity style={styles.CardWrap} onPress={onPress}>
      <View style={styles.Card}>
          <Image source={{uri: cover_img[0]}} style={styles.img} />
          {/* <FitImage
            source={{uri: cover_img[0]}}
            resizeMode="contain"
            style={{marginBottom:10, marginTop:10, height: 80, width: 60}}
          /> */}
          <View style={styles.CardR}>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
            <View style={{width:'90%',marginTop:10,flexDirection:'row',alignItems:'flex-end'}}>
              <PricePanel price={price} color={theme.tbColor} size={18} />
              <Text style={{color:'#888',marginLeft: 8}}>库存{stock}</Text>
            </View>
          </View>
      </View>
    </TouchableOpacity>
  )
}
