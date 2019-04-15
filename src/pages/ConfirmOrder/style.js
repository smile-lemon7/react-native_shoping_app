import { StyleSheet } from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: "#f1f1f1",
    paddingTop: theme.statusBarHeight,
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',
  },
  addressPanelWrap: {
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: '4%',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  CT: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  CTL: {
    marginRight: 10,
    fontSize: 14,
  },
  confirmBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 10,
    width: '100%',
    height: 50,
    paddingRight: '4%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  sumCounts: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sumPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  }
})