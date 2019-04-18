import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import PricePanel from '../../components/PricePanel';
import theme from '../../theme';
import FitImage from 'react-native-fit-image';


export default function ClsProdItem({price, title, cover_img, stock, onPress}) {
  let height = 0;
  
  return(
    <TouchableOpacity style={styles.CardWrap} onPress={onPress}>
      <View style={[styles.Card, styles.ClsCard]}>
        <Image source={{uri: cover_img[0]}} style={styles.img} />
        <View style={[styles.CardR, {justifyContent:'flex-start',height:'40%'}]}>
          <Text style={[styles.title, {height:20}]} numberOfLines={1}>{title}</Text>
          <View style={{width:'90%',marginBottom: 10}}>
            <PricePanel price={price} color={theme.tbColor} size={16} oth_size={12}/>
            {/* <Text style={{color:'#888',marginLeft: 4,fontSize:12}}>库存{stock}</Text> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
