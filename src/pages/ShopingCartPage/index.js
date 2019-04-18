import React, { Component } from 'react';
import { Text, View, Image, AsyncStorage, TouchableHighlight, FlatList, DeviceEventEmitter } from 'react-native';
import styles from './style.js';
import theme from '../../theme';
import icon from '../../fontConf';
import Toast from 'react-native-root-toast';

import cartServices from '../../services/cart';
import { formatImageUrl } from '../../utils/utils';

import Loading from '../../components/Loading';
import CheckBox from '../../components/CheckBox';
import AgreeItem from '../../components/CheckBox/AgreeItem';
import MyButton from '../../components/MyButton';
import PricePanel from '../../components/PricePanel';

export default class ShopingCartPage extends Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    console.log(navigationOptions , navigation )
    return {
      title: '购物车',
      tabBarIcon: ({focused}) => {
        const icon = focused
            ? require('../../assets/shoping_cart_selected.png')
            : require('../../assets/shoping_cart.png');
        return <Image source={icon} style={{height: 22, width: 22}}/>;
      },
      // headerRight: (<TouchableHighlight underlayColor={'transparent'}> 
      //   <Text style={{color:'#fff',fontSize:15,marginRight:9}}>管理3</Text>
      // </TouchableHighlight>)
    }
  }

  
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      checked: false,
      allChecked: false,
      selected: [],
      sumPrice: 0,
      rmBtn: false,
    }
  }

  async componentDidMount() {

    var that = this;
    this.cartListener = DeviceEventEmitter.addListener('addCart', function(params){
      params.cover_img = JSON.parse(params.cover_img).map(item => (formatImageUrl(item)))
      let list = that.state.list;
      list.push(params)
      that.setState({list})
    });

    const userInfo = await AsyncStorage.getItem('userInfo');
    this.setState({user_id: JSON.parse(userInfo).id});
    let { data: list } = await cartServices.query({user_id: JSON.parse(userInfo).id});
    console.log(list)
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
      DeviceEventEmitter.emit('allChecked', {allChecked: false})
      this.setState({
        selected: [],
        allChecked: false,
      })
    }else {
      let idArr = [];
      list.forEach(item => {
        idArr.push(item.cart_id)
      })
      DeviceEventEmitter.emit('allChecked', {allChecked: true})
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
      this.props.navigation.navigate('confirmOrder', {unConfirmOrder: params});
      DeviceEventEmitter.emit('allChecked', {allChecked: false})
      this.setState({allChecked: false})
    }else {
      Toast.show('请选择商品',{position: Toast.positions.CENTER})
    }
  }

  removePro = () => {
    this.setState({rmBtn: !this.state.rmBtn})
  }

  removeCartProd = async ({selected, user_id}) =>{
    if( selected.length>0 ) {
      for(let cart_id of selected) {
        await cartServices.del({user_id, id: cart_id});
      }
      let { data: list } = await cartServices.query({user_id});
      this.setState({list, selected: [], rmBtn: false, allChecked: false})
    }else {
      Toast.show('请选择删除的商品',{position: Toast.positions.CENTER})
    }
    
  }
  removeCartProdSuccess = () => {
    this.setState({rmBtn: false})
  }
  

  render() {
    let { list, selected, loading, sumPrice, allChecked, user_id, rmBtn } = this.state;
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
                style={{marginBottom:50}}
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
            </View>:<View style={{flex: 1,alignItems:'center'}}><Text>购物车还没有商品，快去添加吧!</Text></View>
            }
            <View style={styles.bottomWrap}>
              <View style={{width: 70}}>  
                <AgreeItem 
                  checked= {allChecked}
                  onSelect={this.onChangeSum}
                  label={'全选'}
                />
              </View>
              {rmBtn?<View style={{flexDirection:'row'}}>
                <MyButton 
                    btnName={'删除'} 
                    btnStyle={{
                      width: 60,
                      height: 28,
                      borderWidth: 0,
                      backgroundColor: theme.tbColor,
                      borderTopLeftRadius: 14,
                      borderTopRightRadius: 14,
                      borderBottomLeftRadius: 14,
                      borderBottomRightRadius: 14,
                      marginRight:8,
                    }}
                    textStyle={{
                      fontSize: 15,
                      color: '#fff'
                    }}
                    onPress={() => this.removeCartProd({selected, user_id})} 
                  />
                  <MyButton 
                    btnName={'完成'} 
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
                      color: '#fff'
                    }}
                    onPress={this.removeCartProdSuccess} 
                  />
              </View>:
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Text style={{color:theme.primaryColor,marginRight:8,fontSize:16}} onPress={this.removePro}>管理</Text>
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
              }
            </View>
          </View>
        }
      </View>
    );
  }
  componentWillUnmount(){
    this.cartListener.remove();
  };
}
