import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from 'react-native-splash-screen';

// Redux intialize
import { connect } from 'react-redux';
import { rdxSetBookmark } from '../store/actions';

class SplashPage extends Component {

    // Get data bookmark
    getDataLocal = async () => {
        try {
            const value = await AsyncStorage.getItem('@data_bookmark')
            if (value !== null) {
                return value;
            }
        } catch (e) {
            // Error handling
        }
    }

    // Handle next page
    handleNextPage = async () => {
        let dataBookmark = await this.getDataLocal();

        if (dataBookmark) {
            this.props.onRdxSetBookmark(dataBookmark.split(','));
        }

        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'HOME' }]
        });
    }

    componentDidMount() {
        // Add delay time before enter main page
        setTimeout(() => {
            SplashScreen.hide();
            this.handleNextPage()
        }, 3000);
    }

    render() {
        return (
            <SafeAreaView style={style.mainContainer}>

            </SafeAreaView>
        );
    }
}

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 64,
        fontWeight: '700'
    }
});

const mapStateToProps = state => {
    return {
        dataBookmark: state.bookmark.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRdxSetBookmark: (data) => dispatch(rdxSetBookmark(data))
    }
}

const rdxSplashPage = connect(mapStateToProps, mapDispatchToProps)(SplashPage);

export { rdxSplashPage as SplashPage };