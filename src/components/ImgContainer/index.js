import React, { Component } from 'react';
import { View, Image, Dimensions, Text } from 'react-native';
import FitImage from 'react-native-fit-image';
let screenWidth =  Dimensions.get('window').width;

export default class ImgContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heightArr: [],
    }
  }
  componentWillMount() {
    let { imgList } = this.props;
    let arr = [];
    imgList.forEach(itm => {
      Image.getSize(itm, (width, height) => {
        // itm.height = screenWidth * height / width; //按照屏幕宽度进行等比缩放
        arr.push(screenWidth * height / width )
        this.setState({heightArr: arr})
      });
    })
    this.setState({imgList})
  }
  render() {
    let { imgList, heightArr } = this.state;
    return (
      <View style={{flex: 1}}>
        {heightArr.length>0?imgList.map((itm, inx) => (
          <Image source={{uri: itm}} style={{width:screenWidth, height: heightArr[inx]}} key={inx} />
          // <FitImage
          //   source={{uri:itm}}
          //   resizeMode="contain"
          // />
        ))
        :null
        }
      </View>
    )
  }
}
