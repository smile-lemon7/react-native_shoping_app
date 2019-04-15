import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  Wrap: {
   width: '96%',
   marginLeft: '2%',
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
   backgroundColor: '#fff',
   borderRadius: 4,
   paddingLeft: '2%',
   paddingRight: '2%',
   paddingTop: 10,
   paddingBottom: 10,
  },
  agreeItemWrap: {
    width: '96%',
    marginLeft: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
    paddingLeft: '2%',
    paddingRight: '2%',
    paddingTop: 10,
    paddingBottom: 10,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#888',
    borderWidth: 1,
    marginRight: 10,
  },
  RPanel: {
    flex: 1,
    flexDirection: 'row',
  },
  CardR: {
    width: '70%',
    justifyContent: 'space-around',
  }
})