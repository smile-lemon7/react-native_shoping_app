import React, { Component } from 'react';
import { View, Text, TouchableHighlight, AsyncStorage, Modal, FlatList } from 'react-native';
import { Switch } from 'react-native-switch';

import styles from './style.js';
import icon from '../../fontConf';
import theme from '../../theme';
import { isPhoneNum } from '../../utils/utils';
import Toast from 'react-native-root-toast';
import addressServices from '../../services/address';

import AddressInput from '../../components/AddressInput';
import AddressPanel from '../../components/AddressPanel';
import Loading from '../../components/Loading';


export default class AddressPage extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '我的收货地址',
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
    ),
    headerRight: (<TouchableHighlight onPress={() => navigation.state.params.showModal()} underlayColor={'transparent'}> 
      <Text style={{color:'#fff',fontSize:15,marginRight:9}}>添加新地址</Text>
    </TouchableHighlight>)
  })
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      type: 'add',
      receiver: '',
      phone: '',
      details: '',
      isDefault: false,
      loading: true,
      list: [],
      editInfo: {},
    }
  }

  async componentWillMount() {
    let userInfo = await AsyncStorage.getItem('userInfo');
    const user_id = JSON.parse(userInfo).id;
    this.setState({user_id});
    const { data: list} = await addressServices.query_all({user_id});
    this.setState({list, loading: false});
  }

  componentDidMount() {
    this.props.navigation.setParams({showModal: this.showAddModal})
  }

  showAddModal = () => {
    this.setState({visible: true, type: 'add'});
  }

  showModal = () => {
    this.setState({visible: true});
  }

  onSave = (params) => {
    const {phone, isDefault, _type, details, receiver, user_id, id} = params;
    if( isPhoneNum(phone) ) {
      if(_type === 'add') {
        addressServices.add({details, isDefault, phone, receiver, user_id});
      }else {
        addressServices.edit({details, isDefault, phone, receiver, user_id, id});
      }
      this.setState({visible: false})
    }else {
      Toast.show('该联系方式不存在', {position: Toast.positions.CENTER});
      this.setState({visible: false})
    }
  }

  onChange = ({nativeEvent: {text}}, type) => {
    if(text) {
      this.setState({[type]: text})
    }
  }

  onEdit = (item) => {

    this.setState({editInfo: item,type: 'edit',visible: true, isDefault: item.isDefault===1?true:false});
  }

  onSelect = async (item) => {
    await AsyncStorage.setItem('deliveryAddress', JSON.stringify(item))
  }

  render() {
    const {visible, receiver, phone, details, isDefault, type, user_id, loading, editInfo} = this.state;
    let { list } = this.state;
    let id = editInfo ? editInfo.id : undefined;
    list = list.map(item => ({...item, onEditClick: ()=>this.onEdit(item), onSelect: ()=>this.onSelect(item)}))
    return (
      <View style={[styles.container]}>
        {
          list.length>0?<FlatList 
          data={list}
          renderItem={({item}) => <AddressPanel addressInfo={item} key={item.id} />}
          style={{width:'100%',backgroundColor:'#f1f1f1'}}
          />:<Text>暂无数据，快去添加吧！</Text>
        }
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
        >
          <View style={styles.modalWrap}>
            <View style={{flexDirection:'row', justifyContent: 'space-between',alignItems:'center'}}>
              <TouchableHighlight onPress={()=>{this.setState({visible: false})}} underlayColor={'transparent'}>
                <View style={{flexDirection: 'row',alignItems:'center'}}>
                  <Text 
                    style={{fontFamily:'Iconfont',fontSize:20,color:'#000'}}
                  >
                    {icon('zuojiantou')}
                  </Text>
                  <Text style={{color:'#000',fontSize: 15,lineHeight:15}}>返回</Text>
                </View>
              </TouchableHighlight>
              {type==='add'?<Text style={{fontSize:15,lineHeight:15}}>添加地址</Text>:
                <Text style={{fontSize:15,lineHeight:15}}>编辑地址</Text>
              }
              <TouchableHighlight onPress={() => this.onSave({receiver, phone, details, user_id, id, isDefault, _type: type})} underlayColor={'transparent'}> 
                <Text style={{color: theme.tbColor,lineHeight:15,fontSize:15}}>保存</Text>
              </TouchableHighlight>
            </View>
            {JSON.stringify(editInfo)!=='{}'?
            <View style={{width:'100%',alignItems:'center',backgroundColor:'#fff',marginTop: 20}}>
              <AddressInput value={editInfo.receiver} type={'receiver'} title={'收货人'} onChange={this.onChange}/>
              <AddressInput value={editInfo.phone} type={'phone'} title={'手机号码'} onChange={this.onChange}/>
              <AddressInput value={editInfo.details} type={'details'} title={'详细地址'} onChange={this.onChange}/>
            </View>:
            <View>
              <AddressInput  type={'receiver'} title={'收货人'} onChange={this.onChange}/>
              <AddressInput  type={'phone'} title={'手机号码'} onChange={this.onChange}/>
              <AddressInput  type={'details'} title={'详细地址'} onChange={this.onChange}/>
            </View>
            }
            <View style={styles.btnWrap}>
              <View style={{width:'96%',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text>设置默认地址</Text>
                <Switch 
                  value={isDefault}
                  circleSize={30}
                  barHeight={30}
                  circleBorderWidth={0}
                  onValueChange={() => this.setState({isDefault: !isDefault})}
                  backgroundActive={theme.primaryColor}
                  backgroundInactive={'#ccc'}
                  circleActiveColor={'#f1f1f1'}
                  circleInActiveColor={'#f1f1f1'}
                  changeValueImmediately={true}
                  switchLeftPx={2} 
                  switchRightPx={2} 
                  switchWidthMultiplier={2}
                  changeValueImmediately={true}
                  changeValueImmediately={true}  
                  innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} 
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}