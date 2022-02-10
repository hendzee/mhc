import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Redux intialize
import { connect } from 'react-redux';
import { rdxBookmark } from '../store/actions';

class DetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // Handle back
    handleBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <SafeAreaView style={style.mainContainer}>
                <View style={style.appBar}>
                    <View style={style.closeButtonContainer}>
                        <TouchableOpacity
                            onPress={this.handleBack}
                            activeOpacity={0.8}>

                            <Icon name="close" size={30} backgroundColor="#EFE" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.onRdxBookmark(this.props.route.params.dataDetail.id.toString())

                            // Set data to local
                            storeData(this.props.dataBookmark);
                        }}
                        style={
                            this.props.dataBookmark.includes(this.props.route.params.dataDetail.id) ?
                                style.buttonBookmark2
                                : style.buttonBookmark1
                        }
                        activeOpacity={0.8}
                    >
                        <Text style={
                            this.props.dataBookmark.includes(this.props.route.params.dataDetail.id) ?
                                style.textBookMark2
                                : style.textBookMark1
                        }>
                            {
                                this.props.dataBookmark.includes(this.props.route.params.dataDetail.id) ?
                                    'Remove Bookmark' : 'Bookmark'
                            }
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={style.imageContainer} >
                    <ImageViewer imageUrls={[{ url: this.props.route.params.dataDetail.url }]} />
                </View>
            </SafeAreaView >
        );
    }
}

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    appBar: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center'
    },
    imageContainer: {
        flex: 1
    },
    closeButtonContainer: {
        flexGrow: 1
    },
    buttonBookmark1: {
        backgroundColor: '#8395a7',
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    buttonBookmark2: {
        borderWidth: 1,
        borderColor: '#8395a7',
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    textBookMark1: {
        color: '#FFF'
    },
    textBookMark2: {
        color: '#000'
    }
});

const mapStateToProps = state => {
    return {
        dataBookmark: state.bookmark.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRdxBookmark: (data) => dispatch(rdxBookmark(data))
    }
}

const rdxDetaiilPage = connect(mapStateToProps, mapDispatchToProps)(DetailPage);

export { rdxDetaiilPage as DetailPage };