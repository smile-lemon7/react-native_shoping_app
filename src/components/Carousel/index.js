import React from 'react';
import Swiper from 'react-native-swiper';
import { View, Image } from 'react-native';
import styles from './style';

const Carousel = ({carouselList}) => {
  return(
    <Swiper 
      style={styles.wrapper} 
      height={190}
      autoplay={true}
      loop
      dot={<View style={{backgroundColor:'#ccc', width: 8, height: 8,borderRadius: 4, marginLeft: 5, marginRight: 5, marginTop: 10, marginBottom: 10,}} />}
      activeDot={<View style={{backgroundColor: '#f00', width: 8, height: 8, borderRadius: 4, marginLeft: 5, marginRight: 5, marginTop: 10, marginBottom: 10}} />}
      paginationStyle={{
        bottom: '20%', 
        left: null, 
        right: '50%',
        marginLeft: '-50%'
      }}
    >
      {carouselList.map(cl => (
        <View style={styles.slide} key={cl.id}>
          <Image source={{uri:cl.cover_img}} style={{width:'100%',height:'100%'}}/>
        </View>
      ))}
    </Swiper>
  )
}

export default Carousel