import React, { Component } from 'react';
import { View, TextInput, Text } from 'react-native';
import styles from './style.js';
import iconf from '../../fontConf';

export default function AddressInput({title, value, type, onChange}) {
  console.log( value )
  return(
    <View style={styles.wrap}>
      {type === 'phone' || type === 'receiver' ?
        <View style={styles.inpWrap}>
          <TextInput
            style={styles.inp}
            value={value}
            placeholder={title}
            onChange={(e)=>onChange(e, type)}
          />
          {type === 'receiver'?<Text style={{fontFamily:'Iconfont',fontSize:22,color:'#ccc'}}>{iconf('lianxiren')}</Text>:null}
        </View>
      : <TextInput
          multiline = {true}
          numberOfLines = {4}
          style={[styles.detailsInp]}
          value={value}
          placeholder={title}
          onChange={(e)=>onChange(e, type)}
        />
    }
    </View>
  )
}