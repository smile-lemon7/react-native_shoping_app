import React from 'react';
import { View, Text, TouchableHighlight, ScrollView } from 'react-native';
import styles from './GroupStyle';
import theme from '../../theme';

import PricePanel from '../PricePanel';
import OrderProItem from './Item';
import MyButton from '../MyButton';

export default function Group({list, onCancelOrder, onPay, onRemove, onConfirmReceive}) {
  return (<ScrollView style={styles.wrap}>
    {list.length>0?list.map(item => (
      <View key={item.order_id} style={styles.orderPanel}>
        <TouchableHighlight onPress={item.onClick} underlayColor={'transparent'} style={{width:'100%'}}>
          <View style={styles.top}>
            {item.status===0?<View style={styles.title}><Text style={{color:theme.tbColor}}>等待买家付款</Text></View>:null}
            {item.status===1?<View style={styles.title}><Text style={{color:theme.tbColor}}>买家已付款</Text></View>:null}
            {item.status===2?<View style={styles.title}><Text style={{color:theme.tbColor}}>卖家已发货</Text></View>:null}
            {item.status===3?<View style={styles.title}><Text style={{color:theme.tbColor}}>交易成功</Text></View>:null}
            <OrderProItem key={item.id} prodList={item.orderProdArr} />
            <View style={styles.bottomWrap}>
              <View style={styles.counts}><Text>共</Text><Text>{item.orderProdArr.length}</Text><Text>件商品</Text></View>
              <View style={{flexDirection:'row'}}><Text>合计：</Text><PricePanel price={item.sumprice} color='#000' size={18} /></View>
            </View>
          </View>
        </TouchableHighlight>
        {/** 1：未付款*/}
        {item.status===0?  
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
              onPress={() => onCancelOrder({id: item.order_id})} 
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
              onPress={()=> onPay({id: item.order_id})} 
            />
          </View>:null
          }
          {item.status===2?<View style={styles.btnWrap}>
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
              onPress={()=>onConfirmReceive({id: item.order_id})} 
            />
          </View>:null
          }
          {item.status===3?<View style={styles.btnWrap}>
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
              onPress={()=> onRemove({id: item.order_id})} 
            />
          </View>:null
          }
      </View>
    )):<View style={{width:'100%',justifyContent:'center',alignItems:'center',marginTop:20}}><Text>您暂时没有任何订单信息</Text></View>
    }
  </ScrollView>)
}