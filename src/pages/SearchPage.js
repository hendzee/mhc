import React, { Component } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { ItemComponent } from '../components';
import { getItem } from '../repositories/DataRepo';
import { rdxSetNewData } from '../store/actions';
import Icon from 'react-native-vector-icons/Ionicons';

// Redux data intialize
import { connect } from 'react-redux';

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            textValue: ''
        };
    }

    async componentDidMount() {
        if (this.props.dataItem == null || this.props.dataItem.length == 0) {
            let data = await getItem();
            this.props.onRdxSetNewData(data);
        }
    }

    // Search data handler function
    searchData = (text) => {
        let tempData = this.props.dataItem;

        if (text.length == 0) {
            this.setState({
                data: [],
                textValue: ''
            })
            return
        };

        tempData = tempData.filter(
            (item) => item.id.match(text)
        );

        if (tempData == null || tempData.length == 0) {
            this.setState({
                data: [],
                textValue: text
            })
            return
        };

        this.setState({
            data: tempData,
            textValue: text
        });
    }

    // Clear text on textinput
    clearData() {
        this.setState({
            data: [],
            textValue: ''
        })
    }

    // Handle back
    handleBack() {
        this.props.navigation.goBack();
    }

    // Go to detail page
    goToDetailPage(dataDetail) {
        this.props.navigation.navigate('DETAIL', { 'dataDetail': dataDetail });
    }

    extractData() {
        return (
            <FlatList
                data={this.state.data}
                contentContainerStyle={{ paddingBottom: 30 }}
                renderItem={({ item, index }) => <ItemComponent
                    index={index}
                    dataItem={item}
                    toDetailPage={(dataDetail) => this.goToDetailPage(dataDetail)}
                />}
            />
        )
    };

    render() {
        return (
            <View>
                <View style={style.searchBoxContainer}>
                    <TouchableOpacity
                        onPress={() => this.handleBack()}
                    >
                        <Icon name="chevron-back" size={30} backgroundColor="#EFE" />
                    </TouchableOpacity>
                    <View style={style.textInputContainer}>
                        <TextInput
                            placeholder='Search by name...'
                            onChangeText={(text) => this.searchData(text)}
                            value={this.state.textValue}
                        />
                    </View>
                    <TouchableOpacity onPress={() => this.clearData()}>
                        <Icon name="close" size={30} backgroundColor="#EFE" />
                    </TouchableOpacity>
                </View>
                {this.extractData()}
            </View>
        );
    }
}

const style = StyleSheet.create({
    searchBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15
    },
    textInputContainer: {
        flexGrow: 1
    }
});

const mapStateToProps = state => {
    return {
        dataItem: state.item.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRdxSetNewData: (data) => dispatch(rdxSetNewData(data))
    }
}

const rdxSearchPage = connect(mapStateToProps, mapDispatchToProps)(SearchPage);

export { rdxSearchPage as SearchPage };