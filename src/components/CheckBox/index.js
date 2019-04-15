import React, { Component } from 'react';
import { View, TouchableHighlight, Text, Image } from 'react-native';
import styles from './style.js';
import icon from '../../fontConf';
import theme from '../../theme';
import ProdCount from '../ProdCount';
import PricePanel from '../PricePanel';

class CheckBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    }
  }

  componentWillMount() {
    let { counts } = this.props.info;
    console.log(counts)
    this.setState({count: counts*1})
  }


  onCheck = () => {
    let { checked } = this.state;
    this.setState({checked: !checked});
    this.props.onSelect({checked: !checked, cartId: this.props.info.cart_id})
  }

  onAdd = () => {
    let { info } = this.props;  
    this.setState({count: ++this.state.count})
    this.props.onAdd({item: info })
  }

  onReduce = () => {
    let { info } = this.props;  
    let count = this.state.count;
    if(count > 1) {
      this.setState({count: --count})
      this.props.onReduce({item: info})
    }else {
      this.setState({count: 1})
      this.props.onReduce({counts: 1, item: info})

    }
  }

  render() {
    let { checked, count } = this.state;
    let { info } = this.props;  
    let { cover_img, title, price, id } = info;

    return (
      <View style={styles.Wrap}>
        <TouchableHighlight onPress={this.onCheck} underlayColor={'transparent'} style={{width: 24,height:24}}>
          <View style={styles.radio}>
            {checked?<Text style={{fontFamily:'Iconfont',fontSize: 18, color:theme.primaryColor,marginTop:3,marginLeft:2}}>{icon('duihao1')}</Text>:null}
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>this.props.onDetails(id)} underlayColor={'transparent'}>
          <View style={styles.RPanel}>
            <Image source={{uri: cover_img[0]}} style={{width: 80, height: 80,marginBottom:15}} />
            <View style={styles.CardR}>
              <Text numberOfLines={2} >{title}</Text>
              <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
                <PricePanel price={price} color={theme.tbColor} size={20} oth_size={16} />
                <ProdCount count={count} onAdd={this.onAdd} onReduce={this.onReduce} />
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

export default CheckBox