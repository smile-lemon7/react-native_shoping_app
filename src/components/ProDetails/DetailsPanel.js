import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import ImgContainer from '../ImgContainer';
import Loading from '../Loading';

export default class DetailsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }
  componentWillMount() {
    this.setState({prod_content: this.props.prod_content})
  }
  componentDidMount() {
    const that = this;
    setTimeout(function(){
      that.setState({loading: false})
    }, 1)
  }
  render() {
    return (
      <ScrollView>
      {this.state.loading?<Loading />: <ImgContainer imgList={this.state.prod_content} />}
        {/* <ImgContainer imgList={prod_content} /> */}
      </ScrollView>
    )
  }
}


 

