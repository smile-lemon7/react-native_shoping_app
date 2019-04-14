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
    alignItems: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  prodDetailWrap: {
    width: '100%',
    backgroundColor: '#fff'
  },
  recommendWrap: {
    width: '92%',
    flexDirection: 'row',
  },
  normsTitleWrap: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 15,
    justifyContent: 'center',
  },
  normsTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  normsWrap: {
    width: '92%',
    flexDirection: 'row',
    marginLeft: '4%',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  normals_title: {
    width: 100,
    marginRight: 20,
  }
})