import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Redux intialize
import { connect } from 'react-redux';
import { rdxBookmark } from '../store/actions';
import storeData from '../utils/storeLocalBookmark';

const SetBookmark = (isBookmarked) => {
    if (isBookmarked) {
        return (
            <Icon name="bookmark" size={30} backgroundColor="#EFE" />
        );
    }

    return (
        <Icon name="bookmark-outline" size={30} backgroundColor="#EFE" />
    );
}

class ItemComponent extends Component {
    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={style.itemContainer}
                key={this.props.index}
                onPress={() => this.props.toDetailPage(this.props.dataItem)}
            >
                <View
                    style={style.itemLeftContainer}
                >
                    <Image style={style.image} source={{ uri: this.props.dataItem.url }} />
                    <View>
                        <Text style={style.title}>{`Name: ${this.props.dataItem.id}`}</Text>
                        <Text>{`Category Desc: ${this.props.dataItem.category}`}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        this.props.onRdxBookmark(this.props.dataItem.id.toString())

                        // Set data to local
                        storeData(this.props.dataBookmark);
                    }}
                    activeOpacity={0.8}
                    style={style.bookmarkButtonContainer}
                >
                    {
                        SetBookmark(
                            this.props.dataBookmark.includes(this.props.dataItem.id)
                        )
                    }
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }
}

const style = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#ddd',
        marginBottom: 10,
        marginHorizontal: 20,
    },
    itemLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5,
        flexGrow: 1
    },
    image: {
        width: 50,
        height: 50,
        margin: 15,
    },
    title: {
        fontWeight: 'bold'
    },
    bookmarkButtonContainer: {
        width: 45,
        height: 45,
        alignItems: 'center'
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

const rdxItemComponent = connect(mapStateToProps, mapDispatchToProps)(ItemComponent);

export { rdxItemComponent as ItemComponent };