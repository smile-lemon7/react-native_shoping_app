import React from 'react';
import { View, Text } from 'react-native';
import styles from './style.js';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default function AddressPanel({addressInfo}) {
  const {receiver, phone, area, details, isDefault, onEditClick, onSelect} = addressInfo;
  return(
    <View style={styles.panelWrap}>
      <View style={styles.L}>
        <Text style={{color:'#fff'}}>{receiver[0]}</Text>
      </View>
      <View style={{flex:1,justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingRight:15}}>
        <TouchableHighlight onPress={onSelect} underlayColor={'transparent'} style={{width:'100%'}}>
          <View>
            <View style={styles.CT}>
              <Text style={{marginRight: 10}}>{receiver}</Text>
              <Text>{phone}</Text>
            </View>
            <View style={styles.addressDetails}>
              {isDefault?<Text>
                <Text style={styles.default}>[ 默认地址 ] </Text>
                {area}{details}
              </Text>:<Text>{area}{details}</Text>}
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={onEditClick} underlayColor={'transparent'}><View style={styles.edit}><Text style={{color:'#888'}}>编辑</Text></View></TouchableHighlight>
      </View>
      
    </View>
  )
}