import { StyleSheet } from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
  container: {
    // width: '92%',
    flex: 1,
    overflow: 'scroll',
    alignItems: 'center',
    // backgroundColor: "#F5FCFF",
    backgroundColor: "#f0f0f0",
    paddingTop: theme.statusBarHeight,
  },
  content: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    height: 190,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#9DD6EB',
  },
  slide: {
    height: 190,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  classWrap: {
    width: '100%',
    paddingLeft: '4%',
    flexDirection: 'row',
    marginTop: 15,
    marginBottom :15,
  },
  classCard: {
    minWidth: 50,
    height: 50,
    marginRight: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.primaryColor,
  }
})