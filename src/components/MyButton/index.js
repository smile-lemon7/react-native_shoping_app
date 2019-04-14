import React from 'react';
import { View, TouchableHighlight, Text, StyleSheet, Platform, PixelRatio } from 'react-native';

export default function MyButton({btnName, onPress, btnStyle, textStyle}) {
  return (
    <View style = {{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }}
    >
      <TouchableHighlight
        activeOpacity={1}
        underlayColor={btnStyle.backgroundColor}
        style={[styles.center, styles.btnDefaultStyle, btnStyle]}
        onPress={onPress}
      >
        <Text style={[styles.textDefaultStyle, textStyle]}>{btnName}</Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    justifyContent:'center',
    alignItems: 'center',
  },
  btnDefaultStyle: {
    width: 100,
    height: 34,
    backgroundColor: 'transparent',
    borderColor: '#000',
    borderStyle: 'solid',
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,
    borderWidth: (Platform.OS==='ios' ? 1.0 : 1.5) / PixelRatio.get(),
  },
  textDefaultStyle: {
    fontSize: 12,
    color: '#fff',
  },
});
