import React, { Component } from 'react';
import { Text, View, AsyncStorage, ScrollView, FlatList } from 'react-native';
import styles from './ProductPanel_style.js';
import theme from '../../theme';

import ProdCarousel from '../ProdCarousel';
import PricePanel from '../PricePanel';
import Title from '../Title';
import ImgContainer from '../ImgContainer';
import ProdItem from '../ProdItem';


export default class ProductPanel extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currentAddress: {},
    }

  }
  async componentWillMount() {
    this.setState({...this.props.prod_info});
    const currentAddress = await AsyncStorage.getItem("deliveryAddress");
    this.setState({currentAddress: JSON.parse(currentAddress)});
  }

  render() {
    const { cover_img, price, title, currentAddress, content} = this.state;
    const prodParamsLabel = ['生产日期', '产地', '净含量', '包装种类'];
    let { sameProducts } = this.state;
    // sameProducts = sameProducts.map( item => ({...item, onPress: () => this.props.onDetails({prd_id: item.id})}));
    sameProducts = sameProducts.map( item => ({...item, onPress: () => this.props.onDetails({prd_id: 1})}));

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={{width: '100%', height: 360}}>
            <ProdCarousel prodList={cover_img} />
          </View>
          <View style={styles.baseInfo}>
            <View style={styles.infoTop}>
              <PricePanel price={price} price={price} color={theme.tbColor} size={23} oth_size={18}/>
              <Text style={styles.prodTitle}>{title}</Text>
            </View>
            <View style={styles.bottom}>
              <View style={styles.prod}>
                <Text style={styles.tit}>服务</Text>
                <View style={styles.prod_R}>
                  <Text>破损包退</Text>
                </View>
              </View>
              <View style={styles.prod}>
                <Text style={styles.tit}>规格</Text>
                <View style={styles.prod_R}>
                  <Text>配送至：{JSON.stringify(currentAddress)!=='{}'?currentAddress.details:'请添加地址'}</Text>
                </View>
              </View>
              <View style={styles.prod}>
                <Text style={styles.tit}>参数</Text>
                <View style={styles.prod_R}>
                  <Text>生产日期 存储方法</Text>
                </View>
              </View>
              <Title title={'商品详情'} bgColor={'#f1f1f1'} />
              <View style={styles.prodDetailWrap}>
                <ImgContainer imgList={content} />
              </View>
              <Title title={'看了又看'} bgColor={'#f1f1f1'} />
              <FlatList 
                numColumns={2}
                columnWrapperStyle={{justifyContent:'space-between',width:'96%',paddingLeft:'5%',paddingRight:'2%',marginBottom: 20}}
                data={sameProducts}
                renderItem={({item}) => <ProdItem key={item.id} {...item} />}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
