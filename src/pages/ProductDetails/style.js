import { StyleSheet } from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#F5FCFF",
    paddingTop: theme.statusBarHeight,
  },
  bottomWrap: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottomBtnWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  itemWrap: {
    width: '92%',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: '4%',
    borderBottomWidth: 1,
    borderColor: '#f1f1f1',
  },
  addressItemWrap: {
    width: '92%',
    marginTop: 12,
    paddingTop: 12,
    paddingBottom: 12,
    marginLeft: '4%',
    borderBottomWidth: 1,
    borderColor: '#f1f1f1',
  },
  addressItemT: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressDetails: {
    position: 'relative',
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
  },
  default: {
    color: theme.tbColor,
    lineHeight: 24,
  },


})