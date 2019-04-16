import React from 'react';
// import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import theme from '../../theme';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    // width: window.width,
    width: 80,
    height: window.height,
    backgroundColor: '#fff',
    padding: 10,
    paddingTop: 24,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
    marginTop: 12,
  },
  curr_tab: {
    color: theme.primaryColor,
  }
});

export default function Menu({ onItemSelected, classes, curr_tab }) {
  console.log( curr_tab )
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      {classes.map(cs => (
        <Text 
          key={cs.id} 
          onPress={() => onItemSelected({name:cs.name,cls_id: cs.id})} 
          style={curr_tab.id===cs.id?[styles.item, styles.curr_tab]:[styles.item]}
        >{cs.name}</Text>
      ))
      }
    </ScrollView>
  );
}