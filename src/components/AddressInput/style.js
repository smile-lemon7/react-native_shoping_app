import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrap: {
    width: '96%',
    paddingTop: 12,
    // paddingBottom: 8,
    // borderBottomWidth: 1,
    // borderColor: '#f00',
  },
  inpWrap: {
    paddingTop:10,
    paddingBottom: 4,
    paddingLeft: 6,
    flexDirection:'row',
    borderColor: '#ccc', 
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  inp: {
    flex: 1,
  },
  detailsInp: {
    width: '100%',
    paddingBottom: 10,
    paddingTop:10,
    paddingLeft: 6,
  }
})