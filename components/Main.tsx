import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import firebase from 'firebase/compat';
import React, { Component } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearData, fetchUser, fetchUserFollowing, fetchUserPosts } from '../redux/actions';
import { Add } from './main/Add';
import Feed from './main/feed';
import Profile from './main/profile';
import Search from './main/Search';

const Tab = createMaterialBottomTabNavigator();

class Main extends Component<any, any> {
    componentDidMount() {
        this.props.clearData();
        this.props.fetchUser();
        this.props.fetchUserPosts();
        this.props.fetchUserFollowing();
    }

    render() {
        return (
            <Tab.Navigator initialRouteName={'Feed'} labeled={false}>
                <Tab.Screen
                    name="Feed"
                    component={Feed}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name={'home'}
                                color={color}
                                size={26}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name="Search"
                    component={Search}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name={'magnify'}
                                color={color}
                                size={26}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name="_Add"
                    component={Add}
                    listeners={({ navigation }) => ({
                        tabPress: (event) => {
                            event.preventDefault();
                            navigation.navigate('Add');
                        }
                    })}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name={'plus-box'}
                                color={color}
                                size={26}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    listeners={({ navigation }) => ({
                        tabPress: (event) => {
                            console.log('tabPress');
                            event.preventDefault();
                            navigation.navigate('Profile', {
                                uid: firebase.auth().currentUser.uid
                            });
                        }
                    })}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name={'account-circle'}
                                color={color}
                                size={26}
                            />
                        )
                    }}
                />
            </Tab.Navigator>
        );
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
});
const mapDispatchProps = (dispatch) =>
    bindActionCreators(
        { fetchUser, fetchUserPosts, fetchUserFollowing, clearData },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchProps)(Main);
