import React, { Component } from 'react';
import { Text, View, AsyncStorage, FlatList, Image, TouchableHighlight, ScrollView, SectionList, Button} from 'react-native';

import styles from './style.js';
import Carousel from '../../components/Carousel';
import ProdItem from '../../components/ProdItem';

import addressServices from '../../services/address';
import productServices from '../../services/products';
import carouselServices from '../../services/carousel';
import Title from '../../components/Title';
import Loading from '../../components/Loading';
import classesServices from '../../services/classes';
import icon from '../../fontConf';

export default class HomePage extends Component {
  static navigationOptions = {
    title: '首页',
    tabBarIcon: ({focused}) => {
      const icon = focused
          ? require('../../assets/home_selected.png')
          : require('../../assets/home.png');
      return <Image source={icon} style={{height: 22, width: 22}}/>;
    },
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      carouselList: [],
      recommend_prods: [],
      class_loading: true,
      product_loading: true,
      slider_loading: true,
      proClasses: [],
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
      await AsyncStorage.setItem("address", '[]');
    }
    /* slider */
    const {data: carouselList} = await carouselServices.query_carousel();
    this.setState({carouselList, slider_loading: false})

    /* recommend_products */
    const {data: recommend_prods} = await productServices.query_recommend();
    this.setState({recommend_prods, product_loading: false})

    await AsyncStorage.setItem("detail_id", JSON.stringify({prd_id: 0}));

    // const {data: proClasses} = await classesServices.query({user_id: JSON.parse(userInfo).id});
    // this.setState({proClasses, class_loading: false})
  }

  onDetails = async ({prd_id}) => {

    const detail_id = await AsyncStorage.getItem("detail_id");
    if(detail_id !== prd_id) {
      this.props.navigation.navigate('prod_detail', {prd_id});
      await AsyncStorage.setItem("detail_id", JSON.stringify({prd_id}));
    }

  }

  onCarouselDetails = id => {
    this.props.navigation.navigate('carouselDetails', {id})
  }

  // onClass = async (id) => {
  //   console.log(id)
  //   // await AsyncStorage.setItem("curr_tab", JSON.stringify({id}));
  //   this.props.navigation.navigate('classes', {id})
  // }

  render() {
    let { carouselList, recommend_prods, proClasses, class_loading, product_loading, slider_loading } = this.state;
    recommend_prods = recommend_prods.map( item => ({...item, onPress: () => this.onDetails({prd_id: item.id})}));

    return (
      <View style={[styles.container]}>
        <View style={styles.content}>
          {slider_loading?<Loading />:
            <Carousel carouselList={carouselList} onCarouselDetails={this.onCarouselDetails} />
          }
          {/* <View style={styles.classWrap}>
            {class_loading?<Loading />:
              proClasses.map(ps => (
                <TouchableHighlight onPress={()=>this.onClass(ps.id)} underlayColor={'transparent'} key={ps.id}>
                  <View style={styles.classCard}>
                    <Text style={{color: '#fff'}}>{ps.name}</Text>
                  </View>
                </TouchableHighlight>
            ))}
          </View> */}
          <Title title={'商品推荐'} bgColor={'#f1f1f1'} />
          {product_loading?<Loading />:
            <FlatList 
              numColumns={2}
              // columnWrapperStyle={{justifyContent:'space-around'}}
              columnWrapperStyle={{justifyContent:'space-between',width:'94%',paddingLeft:'5%'}}
              data={recommend_prods}
              renderItem={({item}) => <ProdItem key={item.id} {...item} />}
            />
          }
        </View>
      </View>
    );
  }
}
