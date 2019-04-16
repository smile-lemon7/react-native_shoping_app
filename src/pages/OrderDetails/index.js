import React, { Component } from 'react';
import { View, Text, TouchableHighlight, ScrollView, Linking } from 'react-native';

import icon from '../../fontConf';
import theme from '../../theme';
import styles from './style';
import orderServices from '../../services/order';
import Loading from '../../components/Loading';
import OrderProdItem from '../../components/ProdItem/OrderProdItem';
import PricePanel from '../../components/PricePanel';
import InfoItem from '../../components/InfoItem';
import MyButton from '../../components/MyButton';

export default class OrderDetails extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '我的订单',
    headerLeft: (<TouchableHighlight onPress={()=>navigation.goBack()} underlayColor={'transparent'}>
      <View style={{flexDirection: 'row',alignItems:'center',marginLeft:9}}>
        <Text 
          style={{fontFamily:'Iconfont',fontSize:20,color:'#fff'}}
        >
          {icon('zuojiantou')}
        </Text>
        <Text style={{color:'#fff',fontSize: 15}}>返回</Text>
      </View>
    </TouchableHighlight>
    )
  })

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  async componentDidMount() {
    const {params: {order_id}} = this.props.navigation.state;
    const { data } = await orderServices.queryOne({id: order_id});
    this.setState({orderInfo: data, loading: false})    
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

  onDetails = ({prd_id}) => {
    this.props.navigation.navigate('prod_detail', {prd_id});
  }

  topTextRender = ({status}) => {
    console.log(status)
    switch( status ) {
      case 0: return (<View style={styles.orderStatusPanel} justify="between">
        <Text style={styles.statusText}>等待买家付款</Text>
        <Text style={{fontFamily:'Iconfont', fontSize: 50,color:'#fff'}}>{icon('ziyuan1')}</Text>
      </View>)
      case 1: return (<View style={styles.orderStatusPanel} justify="between">
        <Text style={styles.statusText}>买家已付款</Text>
        <Text style={{fontFamily:'Iconfont', fontSize: 60,color:'#fff'}}>{icon('ziyuan')}</Text>
      </View>)
        case 2: return (<View style={styles.orderStatusPanel} justify="between">
          <Text style={styles.statusText}>卖家已发货</Text>
          <Text style={{fontFamily:'Iconfont', fontSize: 70,color:'#fff'}}>{icon('weibiaoti20101')}</Text>
        </View>)
        case 3: return (<View style={styles.orderStatusPanel} justify="fff">
          <Text style={styles.statusText}>交易成功</Text>
          <Text style={{fontFamily:'Iconfont', fontSize: 90,color:'#fff'}}>{icon('jiaoyichenggong')}</Text>
        </View>)
    }
  }

  render() {
    let { orderInfo, loading } = this.state;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {loading ? <Loading />:
          <View style={styles.proPanel}>
            <View style={styles.topText}>
              {this.topTextRender({status: orderInfo.status})}
            </View>
            <View style={styles.addressPanelWrap}>
              <Text style={{fontFamily:'Iconfont',fontSize:24,color:theme.tbColor,marginRight:15}} >{icon('ditu1')}</Text>
                <View style={{flex:1}}>
                  <View style={styles.CT}>
                    <Text style={styles.CTL}>{orderInfo.address.receiver}</Text>
                    <Text>{orderInfo.address.phone}</Text>
                  </View>
                  <View style={styles.CB}><Text>{orderInfo.address.details}</Text></View>
                </View>
              <Text style={{fontFamily:'Iconfont',fontSize:24,color:'#888',marginRight:15}} >{icon('youjiantou')}</Text>
            </View>
            <View style={styles.prodWrap}>
              {orderInfo.orderProdArr.map(pro => (
                <OrderProdItem {...pro} key={pro.id} onDetails={this.onDetails} type="orderDetails" />
              ))
              }
              <View style={styles.totalPricePanel}>
                <Text style={{fontSize: 13}}>订单总价</Text>
                <PricePanel price={orderInfo.sumprice} color={'#000'} size={18} />
              </View>
              <View style={styles.totalPricePanel}>
                <Text style={{fontSize: 13}}>实付款</Text>
                <PricePanel price={orderInfo.sumprice} color={theme.primaryColor} size={18} />
              </View>
            </View>
            <View style={styles.orderDetail}>
              <View style={styles.orderTitleWrap}><Text style={styles.orderTitle}>订单信息</Text></View>
              <InfoItem title={"订单编号:"} value={orderInfo.number} />
              <InfoItem title={"创建时间:"} value={orderInfo.create_at} />
            </View>
            <View style={styles.btnContainer}>
              {/** 1：未付款*/}
              {orderInfo.status===0?  
                <View style={styles.btnWrap}>
                  <MyButton btnName={'取消订单'} 
                    btnStyle={{
                      width: 80,
                      height: 26,
                      borderWidth: 1,
                      borderColor: '#888',
                      borderRadius: 13,
                      marginRight: 12,
                      backgroundColor: 'transparent'
                    }}
                    textStyle={{fontSize: 14,color:'#888',fontWeight:'300'}}
                    onPress={() => this.onCancelOrder({id: orderInfo.order_id})} 
                  />
                  <MyButton btnName={'付款'} 
                    btnStyle={{
                      width: 80,
                      height: 26,
                      borderWidth: 1,
                      borderColor: theme.tbColor,
                      borderRadius: 13,
                      backgroundColor: 'transparent'
                    }}
                    textStyle={{fontSize: 14,color:'#888',fontWeight:'300'}}
                    onPress={()=> this.onPay({id: orderInfo.order_id})} 
                  />
                </View>:null
                }
                {orderInfo.status===2?<View style={styles.btnWrap}>
                  <MyButton btnName={'确认收货'} 
                    btnStyle={{
                      width: 80,
                      height: 26,
                      borderWidth: 1,
                      borderColor: '#888',
                      borderRadius: 13,
                      marginRight: 12,
                      backgroundColor: 'transparent'
                    }}
                    textStyle={{fontSize: 14,color:'#888',fontWeight:'300'}}
                    onPress={()=> this.onConfirmReceive({id: orderInfo.order_id})} 
                  />
                </View>:null
                }
                {orderInfo.status===3?<View style={styles.btnWrap}>
                  <MyButton btnName={'删除订单'} 
                    btnStyle={{
                      width: 80,
                      height: 26,
                      borderWidth: 1,
                      borderColor: '#888',
                      borderRadius: 13,
                      marginRight: 12,
                      backgroundColor: 'transparent'
                    }}
                    textStyle={{fontSize: 14,color:'#888',fontWeight:'300'}}
                    onPress={()=> this.onRemove({id: orderInfo.order_id})} 
                  />
                </View>:null
                }
            </View>
          </View>
        }
      </ScrollView>
    )
  }
}