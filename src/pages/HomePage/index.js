import React, { Component } from 'react';
import { Text, View, AsyncStorage, FlatList, ScrollView, SectionList} from 'react-native';
import styles from './style.js';
import Carousel from '../../components/Carousel';
import ProdItem from '../../components/ProdItem';

import addressServices from '../../services/address';
import productServices from '../../services/products';
import carouselServices from '../../services/carousel';
import Title from '../../components/Title';

export default class HomePage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      carouselList: [],
      recommend_prods: [],
    }
  }
  async componentWillMount() {
    const userInfo = await AsyncStorage.getItem("userInfo");
    this.setState({...JSON.parse(userInfo)});
    /* address */
    const { data } = await addressServices.query_all({user_id: JSON.parse(userInfo).id});
    if( data.length>0 ) {
      let currect_address = data.filter(item => {return item.isDefault});
      currect_address = currect_address.length>0?currect_address[0]:data[0];

      await AsyncStorage.setItem("deliveryAddress", JSON.stringify(currect_address));
      await AsyncStorage.setItem("address", JSON.stringify(data));

    }else {
      await AsyncStorage.setItem("deliveryAddress", '{}');
    }
    /* slider */
    const {data: carouselList} = await carouselServices.query_carousel();
    this.setState({carouselList})

    /* recommend_products */
    const {data: recommend_prods} = await productServices.query_recommend();
    this.setState({recommend_prods})

    await AsyncStorage.setItem("detail_id", JSON.stringify({prd_id: 0}));

  }

  onDetails = async ({prd_id}) => {

    const detail_id = await AsyncStorage.getItem("detail_id");
    if(detail_id !== prd_id) {
      this.props.navigation.navigate('prod_detail', {prd_id});
      await AsyncStorage.setItem("detail_id", JSON.stringify({prd_id}));
    }

  }

  render() {
    let { carouselList, recommend_prods } = this.state;
    recommend_prods = recommend_prods.map( item => ({...item, onPress: () => this.onDetails({prd_id: item.id})}));

    return (
      <View style={[styles.container]}>
        <View style={styles.content}>
          <Carousel carouselList={carouselList} />
          <Title title={'商品推荐'} bgColor={'#f1f1f1'} />
          <FlatList 
            numColumns={2}
            // columnWrapperStyle={{justifyContent:'space-around'}}
            columnWrapperStyle={{justifyContent:'space-between',width:'96%',paddingLeft:'5%',paddingRight:'2%'}}
            data={recommend_prods}
            renderItem={({item}) => <ProdItem key={item.id} {...item} />}
          />
          
        </View>
      </View>
    );
  }
}
