import React, { Component } from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import ProductPanel from '../../components/ProDetails/ProductPanel';
import DetailsPanel from '../../components/ProDetails/DetailsPanel';
import RecommendPanel from '../../components/ProDetails/RecommendPanel';


export default function TopBar() {
  return (
    <ScrollableTabView 
      tabBarUnderlineStyle={{backgroundColor:'#fff'}}
    >
      <ProductPanel tabLabel="商品" />
      <DetailsPanel tabLabel="详情" />
      <RecommendPanel tabLabel="推荐" />
    </ScrollableTabView>
  );
}