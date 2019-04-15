import React, { Component } from 'react';
import { Text, View, Image, AsyncStorage, TouchableHighlight, FlatList } from 'react-native';
import styles from './style.js';
import theme from '../../theme';
import icon from '../../fontConf';
import Toast from 'react-native-root-toast';

import cartServices from '../../services/cart';

import Loading from '../../components/Loading';
import CheckBox from '../../components/CheckBox';
import AgreeItem from '../../components/CheckBox/AgreeItem';
import MyButton from '../../components/MyButton';
import PricePanel from '../../components/PricePanel';

export default class ShopingCartPage extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '购物车',
    tabBarIcon: ({focused}) => {
      const icon = focused
          ? require('../../assets/shoping_cart_selected.png')
          : require('../../assets/shoping_cart.png');
      return <Image source={icon} style={{height: 22, width: 22}}/>;
    },
    // headerRight: (<TouchableHighlight underlayColor={'transparent'}> 
    //   <Text style={{color:'#fff',fontSize:15,marginRight:9}}>管理</Text>
    // </TouchableHighlight>)
  })
  
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      checked: false,
      allChecked: false,
      selected: [],
      sumPrice: 0,
    }
  }

  async componentWillMount() {
    const userInfo = await AsyncStorage.getItem('userInfo');
    this.setState({user_id: JSON.parse(userInfo).id});
    let { data: list } = await cartServices.query({user_id: JSON.parse(userInfo).id});
    this.setState({list, loading: false})
  }

  onSelect = ({checked, cartId}) => {
    console.log( checked, cartId )
    let { selected, list } = this.state;
    if( !checked ) {
      selected.forEach((item, index) => {
        if(cartId === item) {
          selected.splice(index, 1);
        }
      })
      this.setState({
        selected,
        allChecked: false,
      })
    }else {
      selected.push(cartId)
      if(selected.length === list.length) {
        this.setState({
          selected,
          allChecked: true,
        })
      }else {
        this.setState({
          selected,
        })
      }
    }
  }

  onChangeSum = (checked) => {
    let { list } = this.state;
    if( !checked ) {
      this.setState({
        selected: [],
        allChecked: false,
      })
    }else {
      let idArr = [];
      list.forEach(item => {
        idArr.push(item.cart_id)
      })
      this.setState({
        selected: idArr,
        allChecked: true,
      })
    }
  }
  
  onAdd = ({ item }) => {
    let { list, user_id } = this.state;
    list.forEach(itm => {
      if(itm.cart_id === item.cart_id) {
        itm.counts += 1;
        cartServices.addCounts({user_id, id:itm.cart_id, number:1});
      }
    })
    this.setState({list})
  }

  onReduce = ({ item }) => {
    let { list, user_id } = this.state;
    list.forEach(itm => {
        if(itm.cart_id === item.cart_id) {
        if( itm.counts > 1 ) {
          itm.counts -= 1;
          cartServices.reduceCounts({user_id, id:itm.cart_id, number:1});
        }else {
          itm.counts = 1;
        }
      }
    })
    this.setState({list})
  }

  onDetails = (prd_id) => {
    this.props.navigation.navigate('prod_detail', {prd_id});
  }

  onSettlement = (params) => {
    let {orderProdArr} = params;
    if( orderProdArr.length>0) {
      this.props.navigation.navigate('confirmOrder', {unConfirmOrder: params})
    }else {
      Toast.show('请选择商品',{position: Toast.positions.CENTER})
    }
  }

  

  render() {
    let { list, selected, loading, sumPrice, allChecked, user_id } = this.state;
    let orderProdArr = [];
    selected.forEach(item => {
      list.forEach(itm => {
        if(item === itm.cart_id) {
          sumPrice += itm.price * itm.counts;
          orderProdArr.push(itm);
        }
      })
    })
    // console.log(orderProdArr)
    
    return (
      <View style={[styles.container]}>
        {loading ? <Loading />:
          <View style={{flex:1,width:'100%',position:'relative'}}>
            {list.length>0? <View style={styles.panel}>
              <FlatList 
                data={list}
                renderItem={({item}) => <View style={styles.card}>
                  <CheckBox 
                    checked= {selected.includes(item.cart_id)}
                    onSelect={this.onSelect} 
                    info= {item} 
                    onReduce={this.onReduce}
                    onAdd={this.onAdd}
                    onDetails={this.onDetails}
                  />
                </View>}
              />
            </View>:<Text>购物车还没有商品，快去添加吧!</Text>
            }
            <View style={styles.bottomWrap}>
              <View style={{width: 70}}>  
                <AgreeItem 
                  checked= {allChecked}
                  onSelect={this.onChangeSum}
                  label={'全选'}
                />
              </View>
              <View style={{flexDirection:'row'}}>
                {/* <View style={styles.sumPrice}>合计: <PricePanel price={sumPrice} /></View> */}
                <View style={styles.sumPrice}>
                  <Text>合计:</Text>
                  <PricePanel price={sumPrice} color={theme.tbColor} size={18} oth_size={14} />
                </View>
                <MyButton 
                  btnName={'结算'} 
                  btnStyle={{
                    width: 60,
                    height: 28,
                    borderWidth: 0,
                    backgroundColor: theme.primaryColor,
                    borderTopLeftRadius: 14,
                    borderTopRightRadius: 14,
                    borderBottomLeftRadius: 14,
                    borderBottomRightRadius: 14,
                  }}
                  textStyle={{
                    fontSize: 15,
                  }}
                  onPress={() => this.onSettlement({orderProdArr, user_id, sumPrice})} 
                />
              </View>
            </View>
          </View>
        }
      </View>
    );
  }
}
