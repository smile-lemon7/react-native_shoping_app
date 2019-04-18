import { StyleSheet } from 'react-native';
import theme from '../../theme';


export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: "#f1f1f1",
    paddingTop: theme.statusBarHeight,
  },
  myInfo: {
    width: '100%',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  myOrders: {
    width: '96%',
    paddingLeft: '4%',
    paddingRight: '4%',
    backgroundColor: '#fff',
    marginTop: 12,
    borderRadius: 8,
  },
  myOrdersPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 15,
    paddingBottom: 15,
  },
  iconCard: {
    paddingTop: 6,
    paddingBottom: 6,
    alignItems: 'center',
  },
  CT: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 8,
  },
  CTL: {
    marginRight: 10,
    fontSize: 14,
  }


})