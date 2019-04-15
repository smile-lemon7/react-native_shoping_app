import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Modal
} from 'react-native';

export default class Loaing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animating: false,
            modalVisible: false
        }
    }
    componentDidMount(){
        this.setState({
            animating: true,
            modalVisible: true
        })
        this._timer = setTimeout(() => {
            this.setState({
                animating: false,
                modalVisible: false
            });
        }, 1000);
    }

    componentWillUnmount(){
        this._timer && clearTimeout(this._timer);
    }

    render() {
        return(
            <View style={styles.container}>
                <Modal 
                    animationType={'fade'}
                    visible={this.state.modalVisible}
                    transparent={true}
                    onRequestClose={() => {
                        // alert("Modal has been closed.");
                    }}
                >
                    <ActivityIndicator 
                        style={styles.loadingStyle}
                        size="large" // 指示器的大小
                        color='#1a94fc' // 滚轮的前景颜色
                        animating={this.state.animating} // 是否要显示指示器动画 true表示显示 false隐藏
                        hidesWhenStopped={true} // 在animating为false的时候，是否要隐藏指示器
                    />
                </Modal>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    loadingStyle:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)'
    }
});


