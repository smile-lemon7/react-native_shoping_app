import React, { Component } from 'react';
import TabNavigator from 'react-native-tab-navigator';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

import TopBar from '../TopBar';
import HomePage from '../../pages/HomePage';
import ClassesPage from '../../pages/ClassesPage';
import ShopingCartPage from '../../pages/ShopingCartPage';
import MinePage from '../../pages/MinePage';

const HomeIcon = require('../../assets/home.png');
const HomeIcon_S = require('../../assets/home_selected.png');
const ClassesIcon = require('../../assets/classes.png');
const ClassesIcon_S = require('../../assets/classes_selected.png');
const CartIcon = require('../../assets/shoping_cart.png');
const CartIcon_S = require('../../assets/shoping_cart_selected.png');
const MineIcon = require('../../assets/mine.png');
const MinePageIcon = require('../../assets/mine_selected.png');

const tabs = [
  {icon: HomeIcon,selectedIcon: HomeIcon_S, tabPage: 'home', title: '首页', component: HomePage},
  {icon: ClassesIcon,selectedIcon: ClassesIcon_S, tabPage: 'classes', title: '分类', component: ClassesPage},
  {icon: CartIcon,selectedIcon: CartIcon_S, tabPage: 'cart', title: '购物车', component: ShopingCartPage},
  {icon: MineIcon,selectedIcon: MinePageIcon, tabPage: 'mine', title: '我的', component: MinePage},
]
export default class Layout extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTab:'home'
    }
  }
  render() {
    return (<View style={{width:'100%',height:'100%'}}>
      <TabNavigator
        hidesTabTouch={true}
      >
        {tabs.map((item,i) => (
          <TabNavigator.Item
            title={item.title}
            selected={this.state.selectedTab===item.tabPage}
            titleStyle={{color:'#666'}}
            selectedTitleStyle={{color:'#13D1BE'}}
            renderIcon={()=><Image style={styles.tabIcon} source={item.icon}/>}
            renderSelectedIcon = {() => <Image style={styles.tabIcon} source={item.selectedIcon}/>}
            tabStyle={{alignSelf:'center'}}
            onPress = {() => {this.setState({selectedTab:item.tabPage})}}
            key={i}
            >
          <item.component  navigation={this.props.navigation} />
        </TabNavigator.Item>))}
      </TabNavigator>
    </View>)
  }
}

const styles = StyleSheet.create({
  tabIcon:{
    width:23,
    height:23,
  }
});
