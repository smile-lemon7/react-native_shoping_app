import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: "#f0f0f0",
  },
  baseInfo: {
    width: '100%',
    alignItems: 'center'
  },
  infoTop: {
    backgroundColor:'#fff',
    width:'100%',
    paddingLeft:'4%',
    paddingTop: 10,
    paddingBottom: 10,
  },
  prodTitle: {
    fontSize: 13,
    lineHeight: 22,
    marginTop: 4,
  },
  bottom: {
    width: '100%',
    backgroundColor: '#f1f1f1',
    marginTop: 10,
  },
  prod: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#fff',
    
  },
  tit: {
    color: '#888',
    marginRight: 20
  },
  prod_R: {
    flex: 1,
  },
  prodDetailWrap: {
    width: '100%',
    backgroundColor: '#fff'
  },
  recommendWrap: {
    width: '92%',
    flexDirection: 'row',
  },
})