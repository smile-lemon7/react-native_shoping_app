import React, { Component } from 'react';
import { Text, View, ScrollView, AsyncStorage } from 'react-native';
import styles from './style.js';
import theme from '../../theme';

import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import ProductPanel from '../../components/ProDetails/ProductPanel';
import DetailsPanel from '../../components/ProDetails/DetailsPanel';
import RecommendPanel from '../../components/ProDetails/RecommendPanel';
import Loading from '../../components/Loading';

import productServices from '../../services/products';

export default class ProductDetails extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      prod_info: {},
      loading: true,
    }
  }

  componentWillMount() {
    const { params: {prd_id} } = this.props.navigation.state;
    this.query({id: prd_id})
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
      this.props.navigation.navigate('prod_detail', {prd_id});
      await AsyncStorage.setItem("detail_id", JSON.stringify({prd_id}));
      this.setState({loading: true})
    }
  }

  render() {
    const { prod_info, loading } =this.state;
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
        >
          {loading?  <Loading />:
            <ProductPanel tabLabel="商品" prod_info={prod_info} navigation={this.props.navigation} onDetails={this.onDetails} />
          }
          <DetailsPanel tabLabel="详情" />
          <RecommendPanel tabLabel="推荐" />

          
        </ScrollableTabView>
      </View>
    );
  }
}
