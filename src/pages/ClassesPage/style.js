import { StyleSheet } from 'react-native';
import theme from '../../theme';


export default StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#f1f1f1",
    paddingTop: theme.statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prodsWrap: {
    flex: 1,
  }

})