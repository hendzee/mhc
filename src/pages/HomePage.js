import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { getItem } from '../repositories/DataRepo';
import { ItemComponent } from '../components';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Icon from 'react-native-vector-icons/Ionicons';

// Redux data intialize
import { connect } from 'react-redux';
import { rdxSetNewData } from '../store/actions';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
        this.selectFilter.bind(this);
    };

    async componentDidMount() {
        let data = await getItem();

        this.setState({ data: data }, () => {
            this.props.onRdxSetNewData(data);
        });
    };

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

    // Filter menu handler
    selectFilter(filterType) {
        let tempData = this.props.dataItem;

        switch (filterType.toUpperCase()) {
            case 'ODD':
                tempData = tempData.filter(
                    (item) => item.category_name.toUpperCase() == 'ODD');

                if (tempData.length == 0 || tempData == null) return;

                this.setState({
                    data: tempData
                })
                break;

            case 'EVEN':
                tempData = tempData.filter(
                    (item) => item.category_name.toUpperCase() == 'EVEN');

                if (tempData.length == 0 || tempData == null) return;

                this.setState({
                    data: tempData
                })

                break;

            case 'ALL':
                this.setState({
                    data: tempData
                })

                break;

            default:
                break;
        }
    }

    // Go to search page
    goToSearchPage() {
        this.props.navigation.navigate('SEARCH');
    }

    render() {
        return (
            <View style={style.mainContainer}>
                <View style={style.appBar}>
                    <View style={style.appTitleContainer}>
                        <Text style={style.appTitle}>MHC</Text>
                    </View>
                    <View style={style.actionsContainer}>
                        <TouchableOpacity onPress={() => this.goToSearchPage()} style={style.actionButton}>
                            <Icon name="search" size={30} backgroundColor="#EFE" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={style.actionButton}
                            onPress={() => this._panel.show()}>
                            <Icon name="filter" size={30} backgroundColor="#EFE" />
                        </TouchableOpacity>
                    </View>
                </View>

                {this.extractData()}

                <SlidingUpPanel
                    draggableRange={{
                        top: Dimensions.get('window').height * 0.25,
                        bottom: 0
                    }}
                    allowDragging={false}
                    ref={c => this._panel = c}>

                    <View style={style.menuContainer}>
                        <Text style={style.menutitle}>FILTER</Text>
                        <TouchableOpacity
                            style={style.menuItemContainer}
                            onPress={() => {
                                this._panel.hide();
                                this.selectFilter('ALL');
                            }}
                            activeOpacity={0.8}>
                            <Text>SHOW ALL</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={style.menuItemContainer}
                            onPress={() => {
                                this._panel.hide();
                                this.selectFilter('ODD');
                            }}
                            activeOpacity={0.8}>
                            <Text>ODD ONLY</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={style.menuItemContainerWithoutBorder}
                            onPress={() => {
                                this._panel.hide();
                                this.selectFilter('EVEN');
                            }}
                            activeOpacity={0.8}>
                            <Text>EVEN ONLY</Text>
                        </TouchableOpacity>
                    </View>
                </SlidingUpPanel >
            </View >
        );
    }
}

const style = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    separator: {
        height: 30
    },
    appBar: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    appTitleContainer: {
        flexGrow: 1,
    },
    appTitle: {
        fontSize: 24
    },
    actionButton: {
        marginHorizontal: 10
    },
    actionsContainer: {
        flexDirection: 'row'
    },
    menuContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 20
    },
    menuItemContainer: {
        borderBottomWidth: 1,
        paddingVertical: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#DDD',
        marginBottom: 10,
    },
    menuItemContainerWithoutBorder: {
        paddingVertical: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    menutitle: {
        fontWeight: '700'
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

const rdxHomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);

export { rdxHomePage as HomePage };