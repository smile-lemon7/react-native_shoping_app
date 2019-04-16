import { StyleSheet } from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
  wrap: {
    width: '100%',
    paddingLeft: '4%',
    paddingRight: '4%',
    marginTop: 10,
  },
  orderPanel: {
    width: '100%',
    paddingLeft: '4%',
    paddingRight: '4%',
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  top: {
    width: '100%',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  bottomWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  counts: {
    flexDirection: 'row'
  },
  btnWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  }
})