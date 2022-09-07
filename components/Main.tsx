import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions';

class Main extends Component<any, any> {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        const { currentUser } = this.props;
        // console.log(currentUser);
        if (!currentUser) {
            return <View></View>;
        }
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>{currentUser?.name} is logged in</Text>
            </View>
        );
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
});
const mapDispatchProps = (dispatch) =>
    bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
