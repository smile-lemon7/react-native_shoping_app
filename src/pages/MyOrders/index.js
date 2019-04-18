import React, { Component } from 'react';
import { View, AsyncStorage, Linking, DeviceEventEmitter } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import styles from './style.js';
import orderServices from '../../services/order';
import Toast from 'react-native-root-toast';

import theme from '../../theme';
import Group from '../../components/OrderGroup/Group';


export default class MyOrders extends Component {

  constructor(props) {
    super(props);
    this.state = {
      curr_tab: 0,
      list: [],
      stayPay: [],
      delivery: [],
      collectGoods: [],
    }
  }

  async componentDidMount() {
    const { params: {page} } = this.props.navigation.state;
    const userInfo = await AsyncStorage.getItem("userInfo");
    // this.setState({user_id: JSON.parse(userInfo).id})
    let { data } = await orderServices.query({user_id: JSON.parse(userInfo).id});
    let stayPay = data.filter(item => {return item.status === 0});
    let delivery = data.filter(item => {return item.status === 1});
    let collectGoods = data.filter(item => {return item.status === 2});
    this.setState({list: data, curr_tab: page, stayPay, delivery, collectGoods})

    var that = this;
    this.listener = DeviceEventEmitter.addListener('cancelOrder',async function(params){
      const { id } = params;
      let { list } = that.state;
      list = list.filter(ls => {return ls.order_id !== id})
      that.setState({list})
    });
  }

  onDetails = (order_id) => {
    this.props.navigation.navigate('orderDetails', {order_id});
  }

  onConfirmReceive = ({id}) => {
    orderServices.confirmReceive({id})
  }

  onRemove = ({id}) => {
    orderServices.remove({id})
  }

  onPay = async ({id}) => {
    const { data:pay_url } = await orderServices.pay({id});
    const { re_url } = pay_url;  //支付宝回调地址
    Linking.openURL(re_url);
  }

  onCancelOrder = async ({id}) => {
    const {data: {msg}} = await orderServices.calcel({id});
    msg ? Toast.show('取消成功',{position: Toast.positions.CENTER,}) : null;
    let { list } = this.state;
    list = list.filter(ls => {return ls.order_id !== id})
    this.setState({list})
  }
  

  render() {
    let { list, curr_tab, stayPay, delivery, collectGoods, user_id} = this.state;

    list = list.map(item => ({...item, onClick:()=>this.onDetails(item.order_id)}))
    stayPay = stayPay.map(item => ({...item, onClick:()=>this.onDetails(item.order_id)}))
    delivery = delivery.map(item => ({...item, onClick:()=>this.onDetails(item.order_id)}))
    collectGoods = collectGoods.map(item => ({...item, onClick:()=>this.onDetails(item.order_id)}))
    const tabs = [
      {title: '全部', id: 0, list}, 
      {title: '待付款', id: 1, list: stayPay}, 
      {title: '待发货', id: 2, list: delivery},
      {title: '待收货', id: 3, list: collectGoods},
    ];
    return (
      <View style={styles.container}>
        <ScrollableTabView 
          tabBarUnderlineStyle={{backgroundColor: theme.primaryColor,height: 1}}
          tabBarActiveTextColor={theme.primaryColor}
          style={{borderBottomWidth: 0}}
          renderTabBar={() => <ScrollableTabBar 
              style={{height: 40,borderWidth:0,elevation:2,backgroundColor:'#fff'}} 
              tabStyle={{height: 39}} 
              underlineHeight={1}
          />}
          onChangeTab = {(tab) => this.setState({curr_tab: tab.i})}
          page={curr_tab}
        >
          {tabs.map(ts => (
            <Group 
              key={ts.id} 
              list={ts.list} 
              tabLabel={ts.title} 
              onConfirmReceive={this.onConfirmReceive} 
              onRemove={this.onRemove} 
              onPay={this.onPay} 
              onCancelOrder={this.onCancelOrder}
            />
          ))
          }
        </ScrollableTabView>
      </View>
    )
  }
  componentWillUnmount(){
    this.listener.remove();
  }
}