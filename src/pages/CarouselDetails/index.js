import React, { Component } from 'react';
import {ScrollView} from 'react-native';

import ImgContainer from '../../components/ImgContainer';
import carouselServices from '../../services/carousel';
import Loading from '../../components/Loading';

export default class CarouselDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      list: [],
    }
  }

  async componentWillMount() {
    const {params: { id }} = this.props.navigation.state;
    const { data } = await carouselServices.queryOne(id);
    this.setState({list: data.content, loading: false})
  }
  
  render() {
    return (
      <ScrollView style={{marginTop: 24}}>
        {this.state.loading?<Loading />: <ImgContainer imgList={this.state.list} />}
      </ScrollView>
    )
  }
}