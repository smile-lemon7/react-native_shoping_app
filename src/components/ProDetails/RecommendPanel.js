import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import Loading from '../Loading';
import ProdItem from '../ProdItem';


export default class RecommendPanel extends Component {
  
  constructor(props) {
    super(props);
    // this.state = {
    //   loading: true,
    // }
  }
  componentWillMount() {
    this.setState({recommend_prods: this.props.recommend_prods})
  }
  componentDidMount() {
    // const that = this;
    // setTimeout(function(){
    //   that.setState({loading: false})
    // }, 1)
  }
  

  render() {
    // let { loading, recommend_prods } = this.state;
    let {recommend_prods } = this.state;
    recommend_prods = recommend_prods.map( item => ({...item, onPress: () => this.props.onDetails({prd_id: 1})}));
    return (
      <FlatList 
        numColumns={2}
        columnWrapperStyle={{justifyContent:'space-between',width:'96%',paddingLeft:'5%',paddingRight:'2%',marginBottom: 20}}
        data={recommend_prods}
        renderItem={({item}) => <ProdItem key={item.id} {...item} />}
      />
      // <View style={{flex: 1}}>
      //   {loading?<Loading />:
      //     <FlatList 
      //       numColumns={2}
      //       columnWrapperStyle={{justifyContent:'space-between',width:'96%',paddingLeft:'5%',paddingRight:'2%',marginBottom: 20}}
      //       data={recommend_prods}
      //       renderItem={({item}) => <ProdItem key={item.id} {...item} />}
      //     />
      //   }
      // </View>
    );
  }
}
