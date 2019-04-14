import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  count: {
    flexDirection: 'row',
  },
  L: {
    width: 28,
    height: 24,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  C: {
    width: 30,
    height: 24,
    color: '#999',
    borderColor: '#999',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  R: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  }
})