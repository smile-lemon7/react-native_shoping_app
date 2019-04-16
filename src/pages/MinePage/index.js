import React, { Component } from 'react';
import { Text, View, Image, AsyncStorage, TouchableHighlight } from 'react-native';
import styles from './style.js';

import PanelTitle from '../../components/PanelTitle';
import theme from '../../theme.js';
import icon from '../../fontConf';

let orderIcon =  [
  {id: 1, title: '待付款', icon:'daifukuan2'},
  {id: 2, title: '待发货', icon: 'ziyuan'},
  {id: 3, title: '待收货', icon: 'daishouhuo'},
];

export default class MinePage extends Component {
  static navigationOptions = {
    title: '我的',
    tabBarIcon: ({focused}) => {
      const icon = focused
          ? require('../../assets/mine_selected.png')
          : require('../../assets/mine.png');
      return <Image source={icon} style={{height: 24, width: 22}}/>;
    },
  };
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  async componentWillMount() {
    let userInfo = await AsyncStorage.getItem("userInfo");
    const { user_id, phone } = JSON.parse(userInfo);
    this.setState({user_id, phone });

    let curr_address = await AsyncStorage.getItem("deliveryAddress");
    this.setState({curr_address: JSON.parse(curr_address)});
  }

  onMyAddress = () => {
    this.props.navigation.navigate('address');
  }

  onOrderType = (id) => {
    this.props.navigation.navigate('myOrders', {page: id})
  }

  onMyAddress = () => {
    this.props.navigation.navigate('address');
  }

  render() {
    const { phone, curr_address } = this.state;
    orderIcon = orderIcon.map(item => ({...item, onPress: ()=>this.onOrderType(item.id)}))
    return (
      <View style={[styles.container]}>
        <View style={styles.myInfo}>
          <Image source={require('../../assets/avatar.png')} style={{width: 40, height: 40, marginRight:10}} />
          <Text style={{color:'#fff',fontSize:14}}>{phone}</Text>
        </View>
        <View style={styles.myOrders}>
          <PanelTitle title="我的订单" subTitle="查看全部订单" onClick={()=>this.onOrderType(0)}/>
          <View style={styles.myOrdersPanel}>
            {orderIcon.map(item => (
              <TouchableHighlight onPress={item.onPress} underlayColor={'transparent'} key={item.title}>
                <View style={styles.iconCard}>
                  <Text style={{fontFamily:'Iconfont',fontSize:24,color:theme.tbColor,marginBottom: 6}}>{icon(item.icon)}</Text>
                  <Text>{item.title}</Text>
                </View>
              </TouchableHighlight>
            ))
            }
          </View>
        </View>
        <View style={styles.myOrders}>
          <PanelTitle title="我的地址" subTitle="查看全部地址" onClick={this.onMyAddress}/>
          <View style={styles.myAddressPanel}>
            {curr_address?<View style={{width:'100%',paddingTop:12,paddingBottom:12}}>
              <View style={styles.CT}>
                <Text style={styles.CTL}>{curr_address.receiver}</Text>
                <Text>{curr_address.phone}</Text>
              </View>
              <Text style={{lineHeight:20}}>{curr_address.details}</Text>
            </View>:<Text>您还没有地址信息</Text>}
          </View>
        </View>
      </View>
    );
  }
}
