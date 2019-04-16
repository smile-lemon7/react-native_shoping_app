import React, { Component } from 'react';
import { Text, View, Image, AsyncStorage } from 'react-native';
import styles from './style.js';
import theme from '../../theme';
import SideMenu from 'react-native-side-menu';

import classesServices from '../../services/classes';
import ClassGroup from '../../components/ClassGroup';
import Menu from '../../Layout/Menu';
import Loading from '../../components/Loading';

class ClassesPage extends Component {
  static navigationOptions = {
    title: '分类',
    tabBarIcon: ({focused}) => {
      const icon = focused
          ? require('../../assets/classes_selected.png')
          : require('../../assets/classes.png');
      return <Image source={icon} style={{height: 22, width: 22}}/>;
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      classItem: {},
      
    }
  }

  async componentWillMount() {
    const userInfo = await AsyncStorage.getItem("userInfo");
    // this.setState({user_id: JSON.parse(userInfo).id})
    const { data } = await classesServices.query({user_id: JSON.parse(userInfo).id});
    const { data: classItem  } = await classesServices.query_classes_item({cls_id: data[0].id});
    this.setState({classes: data, loading: false, classItem, curr_tab: data[0]});
  }

  onMenuItemSelected = async (item) => {
    const { cls_id, name } = item;
    const { data } = await classesServices.query_classes_item({cls_id});
    this.setState({classItem: data, curr_tab: {id: cls_id, name}});
  }
  

  render() {
    let { classes, loading, classItem, curr_tab } = this.state;
    return (
      <View style={[styles.container]}>
        {loading?<Loading />:
          <SideMenu
            isOpen={true}
            openMenuOffset={80}
            hiddenMenuOffset={80}
            autoClosing={false}
            menu={(<Menu onItemSelected={this.onMenuItemSelected} classes={classes} curr_tab={curr_tab} />)}
          > 
            <View style={styles.prodsWrap}>
              {JSON.stringify(classItem)==='{}'?<View style={{width:'70%',marginTop: 30,alignItems:'center'}}><Text>该分类下暂时没有商品</Text></View>:
                <ClassGroup {...classItem} />
              }
            </View>
          </SideMenu>
        }
      </View>
    );
  }
}


export default ClassesPage