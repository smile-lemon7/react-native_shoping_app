import React, { Component } from 'react';
import { Text, View, Modal, AsyncStorage, TouchableHighlight, FlatList } from 'react-native';
import styles from './style.js';
import theme from '../../theme';
import icon from '../../fontConf';

import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import ProductPanel from '../../components/ProDetails/ProductPanel';
import DetailsPanel from '../../components/ProDetails/DetailsPanel';
import RecommendPanel from '../../components/ProDetails/RecommendPanel';
import MyButton from '../../components/MyButton';
import Loading from '../../components/Loading';
import ProdItemR from '../../components/ProdItem/ProdItemR';
import ProdCount from '../../components/ProdCount';

import productServices from '../../services/products';
import product from '../../models/product';

export default class ProductDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      prod_info: {},
      loading: true,
      visible: false,
      addressModal: false,
      count: 1,
      currentAddress: {},
      addressList: [],
    }
  }

  async componentWillMount() {
    const { params: {prd_id} } = this.props.navigation.state;
    this.query({id: prd_id});
    const currentAddress = await AsyncStorage.getItem("deliveryAddress");
    if(currentAddress!=='{}') {
      this.setState({currentAddress: JSON.parse(currentAddress)})
    }
    const address = await AsyncStorage.getItem("address");
    if(address!=='[]') {
      this.setState({addressList: JSON.parse(address)})
    }
    const userInfo = await AsyncStorage.getItem("userInfo");
    this.setState({user_id: JSON.parse(userInfo).id})
  }

  async componentWillReceiveProps() {
    const {prd_id: old_prd_id} = this.props.navigation.state.params;
    const detail_id = await AsyncStorage.getItem("detail_id");
    let {prd_id} = JSON.parse(detail_id);
    if( old_prd_id!== prd_id) {
      this.query({id: prd_id});
    }
  }

  query = async({id}) => {
    const { data } = await productServices.query_product({id});
    this.setState({prod_info: data, loading: false})
  }

  onDetails = async ({prd_id}) => {
    let { id } = this.state.prod_info;
    if(id !== prd_id) {
      this.setState({loading: true})
      this.props.navigation.navigate('prod_detail', {prd_id});
      await AsyncStorage.setItem("detail_id", JSON.stringify({prd_id}));
      this.setState({curr_tab: 0})
    }
  }

  showModal = () => {
    this.setState({visible: true})
  }

  onBuy = async ({user_id, product}) => {
    product.counts = 1;
    let arr = [];
    arr.push(product);
    // await AsyncStorage.setItem('unConfirmOrder', JSON.stringify({user_id, sumPrice: product.price, orderProdArr: arr}));
    this.props.navigation.navigate('confirmOrder')
  }

  onAdd = () => {
    this.setState({count: ++this.state.count})
  }

  onReduce = () => {
    let count = this.state.count;
    if(count > 1) {
      this.setState({count: --count})
    }else {
      this.setState({count: 1})
    }
  }

  cartHandle = (params) => {
    this.setState({visible: false})
    product.effects.onCart(params);
  }

  onSelectAddress = () => {
    if(this.state.addressList.length>0) {
      console.log( this.state.addressList )
      this.setState({addressModal: true, visible: false})
    }else {
      console.log('还没有地址，去添加')
    }
  }

  onSelect = async (changeAddress) => {
    await AsyncStorage.setItem('deliveryAddress', JSON.stringify(changeAddress));
    this.setState({addressModal: false, visible: true})
  }

  render() {
    const { user_id, prod_info, loading, visible, count, currentAddress, addressModal } =this.state;
    let { addressList } = this.state;
    addressList = addressList.map(at => ({...at, onSelect: () => this.onSelect(at)}));

    return (
      <View style={styles.container}>
        <ScrollableTabView 
          tabBarUnderlineStyle={{backgroundColor: theme.primaryColor,height: 1}}
          tabBarActiveTextColor={theme.primaryColor}
          style={{borderBottomWidth: 0}}
          renderTabBar={() => <ScrollableTabBar 
              style={{height: 40,borderWidth:0,elevation:2,backgroundColor:'#f1f1f1'}} 
              tabStyle={{height: 39}} 
              underlineHeight={1}
          />}
          onChangeTab = {(tab) => this.setState({curr_tab: tab.i})}
          page={this.state.curr_tab}
        >
          {loading?  <Loading />:
            <ProductPanel tabLabel="商品" prod_info={prod_info} navigation={this.props.navigation} onDetails={this.onDetails} />
          }
          <DetailsPanel tabLabel="详情" prod_content={prod_info.content} />
          <RecommendPanel tabLabel="推荐" recommend_prods={prod_info.sameProducts} onDetails={this.onDetails} navigate={this.props.navigation.navigate} />
        </ScrollableTabView>
        <View style={styles.bottomWrap}>
          <View>
            <Text style={{fontFamily: 'Iconfont', fontSize: 24}}>{icon('huaban-')}</Text>
          </View>
          <View style={styles.bottomBtnWrap}>
            <MyButton 
              btnName={'加入购物车'} 
              btnStyle={{
                height: 32,
                borderWidth: 0,
                backgroundColor: theme.tbColor,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 0,
              }}
              textStyle={{
                fontSize: 14,
              }}
              onPress={this.showModal} 
            />
            <MyButton 
              btnName={'立即购买'} 
              btnStyle={{
                height: 32,
                borderWidth: 0,
                backgroundColor: theme.primaryColor,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 16,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 16,
              }}
              textStyle={{
                fontSize: 14,
              }}
              onPress={() => this.onBuy({user_id, product: prod_info})} 
            />
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
          >
            <TouchableHighlight 
              onPress={() => this.setState({visible: false})}
              style={{flex:1,justifyContent:'center',alignItems:'center',width:'100%',height:'100%',backgroundColor:'rgba(0,0,0,0.3)'}}
              underlayColor={'transparent'}
            >
              <View style={{ width:'100%',marginTop: 22,height: 440,position:'absolute',bottom:0,backgroundColor:'#fff'}}>
                <View style={styles.itemWrap}>
                  <ProdItemR {...prod_info} />
                </View>
                <View style={styles.itemWrap}>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text>配送区域</Text>
                    <Text style={{color:'#888',marginLeft:8}}>(配送地会影响收货, 请正确选择)</Text>
                  </View>
                  <TouchableHighlight
                    onPress={this.onSelectAddress}
                    underlayColor={'transparent'}
                  >
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:8}}>
                      <View style={{width:'100%',flexDirection: 'row',alignItems:'center',justifyContent:'space-between'}}>
                        <Text>{JSON.stringify(currentAddress)!=='{}'?currentAddress.details:'请添加地址'}</Text>
                        <Text style={{fontFamily:'Iconfont',fontSize:22,marginTop:4}}>{icon('youjiantou1')}</Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                </View>
                <View style={[styles.itemWrap, {flexDirection: 'row',justifyContent:'space-between',alignItems:'center'}]}>
                  <Text>购买数量</Text>
                  <ProdCount count={count} onAdd={this.onAdd} onReduce={this.onReduce} />
                </View>
                <MyButton 
                  btnName={'确定'} 
                  btnStyle={{
                    width: '80%',
                    height: 32,
                    borderWidth: 0,
                    borderColor: theme.tbColor,
                    backgroundColor: theme.primaryColor,
                    marginTop: 50,
                  }}
                  textStyle={{
                    fontSize: 14,
                  }}
                  onPress={() => this.cartHandle({user_id, pro_id: prod_info.id, number: count, address_id: currentAddress.id})} 
                />
              </View>
            </TouchableHighlight>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={addressModal}
          >
            <View style={{flex:1,backgroundColor:'#fff',paddingTop: 20}}>
              <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text>配送至</Text>
              </View>
              <FlatList 
                data={addressList}
                renderItem={({item}) => <TouchableHighlight onPress={item.onSelect} underlayColor={'transparent'}>
                  <View style={styles.addressItemWrap}>
                    <View style={styles.addressItemT}>
                      <Text>{item.receiver}</Text>
                      <Text>{item.phone}</Text>
                    </View>
                    <View style={styles.addressDetails}>
                      {item.isDefault?<Text>
                        <Text style={styles.default}>[ 默认地址 ] </Text>
                        {item.area}{item.details}
                      </Text>:<Text>{item.area}{item.details}</Text>}
                    </View>
                  </View>
                </TouchableHighlight>
                }
              />
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}
