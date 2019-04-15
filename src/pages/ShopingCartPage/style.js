import { StyleSheet } from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#f1f1f1",
    paddingTop: theme.statusBarHeight,
  },
  bottomWrap: {
    width: '100%',
    position: 'absolute',
    paddingLeft: '2%',
    paddingRight: '2%',
    bottom: 0,
    left: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sumPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  }
})