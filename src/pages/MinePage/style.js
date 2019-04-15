import { StyleSheet } from 'react-native';
import theme from '../../theme';


export default StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: '4%',
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#F5FCFF",
    paddingTop: theme.statusBarHeight,
    justifyContent: 'space-around'
  },
})