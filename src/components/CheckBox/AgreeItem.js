import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import styles from './style.js';
import icon from '../../fontConf';
import theme from '../../theme';

class AgreeItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({checked: nextProps.checked})
  }

  onCheck = () => {
    let { checked } = this.state;
    this.setState({checked: !checked});
    this.props.onSelect(!checked)
  }

  render() {
    let { checked } = this.state;
    let { label } = this.props;

    return (
      <View style={styles.agreeItemWrap}>
        <TouchableHighlight onPress={this.onCheck} underlayColor={'transparent'} style={{width: 28,height:28}}>
          <View style={styles.radio}>
            {checked?<Text style={{fontFamily:'Iconfont',fontSize: 18, color:theme.primaryColor,marginTop:3,marginLeft:2}}>{icon('duihao1')}</Text>:null}
          </View>
        </TouchableHighlight>
        <Text style={{marginBottom:4}}>{label}</Text>
      </View>
    )
  }
}

export default AgreeItem