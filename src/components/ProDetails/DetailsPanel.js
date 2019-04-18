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
  componentDidMount() {
    this.setState({prod_content: this.props.prod_content, loading: false})
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


 

