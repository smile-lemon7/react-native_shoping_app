import React, { Component } from 'react';
import { Text, View, TouchableHighlight, AsyncStorage, FlatList, Linking } from 'react-native';
import styles from './style.js';
import theme from '../../theme';
import icon from '../../fontConf';
import orderServices from '../../services/order';

import Loading from '../../components/Loading';
import OrderProdItem from '../../components/ProdItem/OrderProdItem';
import PricePanel from '../../components/PricePanel';
import MyButton from '../../components/MyButton';

export default class ConfirmOrder extends Component {
  static navigationOptions = ({navigation}) => ({
    headerLeft: (<TouchableHighlight onPress={()=>navigation.goBack()} underlayColor={'transparent'}>
      <View style={{flexDirection: 'row',alignItems:'center'}}>
        <Text 
          style={{fontFamily:'Iconfont',fontSize:22,color:'#fff'}}
        >
          {icon('zuojiantou')}
        </Text>
        <Text style={{color:'#fff',fontSize: 16}}>确认订单</Text>
      </View>
    </TouchableHighlight>
    )
  })

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentAddress: {}
    }
  }

  async componentWillMount() {
    const { params: {unConfirmOrder} } = this.props.navigation.state;
    this.setState({unConfirmOrder});
    const currentAddress = await AsyncStorage.getItem("deliveryAddress");
    currentAddress !== '{}'?this.setState({currentAddress: JSON.parse(currentAddress), loading: false}): null;
  }

  onSelectAddress = () => {
    this.props.navigation.navigate('address');
  }

  onConfirmOrder = async (params) => {
    let {currentAddress, unConfirmOrder} = params;
    unConfirmOrder.address_id = currentAddress.id;
    let orderProdArr = unConfirmOrder.orderProdArr;
    unConfirmOrder.sumprice = unConfirmOrder.sumPrice;
    delete unConfirmOrder.sumPrice;
    unConfirmOrder.products = JSON.stringify(orderProdArr.map(item => ({id:item.id, count: item.counts})))
    delete unConfirmOrder.orderProdArr;

    // console.log(unConfirmOrder)
    const { data } = await orderServices.submit(unConfirmOrder);
    const { data:pay_url } = await orderServices.pay(data);
    const { re_url } = pay_url;  //支付宝回调地址
    Linking.openURL(re_url)
  }

  render() {
    let { unConfirmOrder, currentAddress, loading } = this.state;
    let {orderProdArr, sumPrice} = unConfirmOrder;
    let list = orderProdArr;
    return (
      <View style={[styles.container]}>
        <TouchableHighlight onPress={this.onSelectAddress} underlayColor={'transparent'} style={{width:'94%',justifyContent:'center'}}>
          <View style={styles.addressPanelWrap}>
            <Text style={{fontFamily:'Iconfont',fontSize:24,color:theme.tbColor,marginRight:15}} >{icon('ditu1')}</Text>
            {loading?<Loading />:
              currentAddress?
              <View style={{flex:1}}>
                <View style={styles.CT}>
                  <Text style={styles.CTL}>{currentAddress.receiver}</Text>
                  <Text>{currentAddress.phone}</Text>
                </View>
                <View style={styles.CB}><Text>{currentAddress.details}</Text></View>
              </View>
            :<View><Text>请选择收货地址</Text></View>
            }
            <Text style={{fontFamily:'Iconfont',fontSize:24,color:'#888',marginRight:15}} >{icon('youjiantou')}</Text>
          </View>
        </TouchableHighlight>
        <FlatList 
          numColumns={1}
          data={list}
          style={{width:'94%',marginBottom:60,marginTop: 15,backgroundColor:'#fff',paddingLeft:'2%',paddingRight:'2%',borderRadius:6}}
          renderItem={({item}) => <View style={styles.itemWrap}>
            <OrderProdItem key={item.id} {...item} />
          </View>}
        />
        <View style={styles.confirmBottom}>
          <View style={styles.sumCounts}>
            <Text>共</Text>
            <Text>{orderProdArr&&orderProdArr.length}</Text>
            <Text>件</Text>
          </View>
          <View style={styles.sumPrice}><Text>合计:</Text><PricePanel price={sumPrice} color={theme.tbColor} size={18} /></View>
          <MyButton 
            btnName={'提交订单'} 
            btnStyle={{
              width: 100,
              height: 32,
              borderWidth: 0,
              backgroundColor: theme.tbColor,
            }}
            textStyle={{
              fontSize: 14,
            }}
            onPress={() => this.onConfirmOrder({currentAddress, unConfirmOrder})} 
          />
        </View>
      </View>
    );
  }
}
