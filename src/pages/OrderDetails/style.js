import { StyleSheet } from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    overflow: 'scroll',
    alignItems: 'center',
    backgroundColor: "#f1f1f1",
    position: 'relative',
  },
  proPanel: {
    // paddingLeft: '2%',
    // paddingRight: '2%',
    position: 'relative',
    flex: 1,
  },
  addressPanelWrap: {
    width: '100%',
    paddingLeft: '2%',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  prodWrap: {
    width: '100%',
    marginTop: 15,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  totalPricePanel: {
    paddingLeft: '4%',
    paddingRight: '4%',
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDetail: {
    backgroundColor: '#fff',
    paddingLeft: '4%',
    paddingRight: '4%',
    paddingBottom: 8,
  },
  orderTitleWrap: {
    borderLeftWidth: 2,
    borderColor: theme.tbColor,
    paddingLeft: 6,
  },
  orderTitle: {
   fontWeight: '300',
  },
  btnContainer: {
    width: '100%',
    paddingRight: '4%',
    paddingTop: 8,
    paddingBottom: 8,
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topText: {
    paddingLeft: '4%',
    paddingRight: '4%',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: theme.primaryColor,
  },
  orderStatusPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusText: {
    color: '#fff',
    fontSize: 18,
  }
})