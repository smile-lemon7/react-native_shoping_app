import { StyleSheet } from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
  panelWrap: {
    width: '100%',
    paddingLeft: '4%',
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  L: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  CT: {
    flexDirection: 'row',
  },
  edit: {
    width: 40,
    paddingLeft: 6,
    borderLeftWidth: 1,
    borderColor: '#888',
  },
  addressDetails: {
    position: 'relative',
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
  },
  default: {
    color: theme.tbColor
  }
})