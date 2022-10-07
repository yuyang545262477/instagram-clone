import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase/compat';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import Loading from './components/auth/loading';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Main from './components/Main';
import { Add } from './components/main/Add';
import Comments from './components/main/Comment';
import Save from './components/main/Save';
import { firebaseConfig } from './private-config/firebase.config';
import rootReducer from './redux/reducers';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

interface AppState {
    loaded: boolean;
    loggedIn: boolean;
}

const store = createStore(rootReducer, applyMiddleware(thunk));

export default class App extends Component<{}, AppState> {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            loggedIn: false
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                this.setState({
                    loggedIn: false,
                    loaded: true
                });
            } else {
                this.setState({
                    loggedIn: true,
                    loaded: true
                });
            }
        });
    }

    render() {
        const { loaded, loggedIn } = this.state;
        if (!loaded) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text>Loading</Text>
                </View>
            );
        }
        if (!loggedIn) {
            return (
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Loading">
                        <Stack.Screen name="Loading" component={Loading} />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                    </Stack.Navigator>
                </NavigationContainer>
            );
        }
        return (
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Main">
                        <Stack.Screen
                            name={'Main'}
                            component={Main}
                            options={
                                {
                                    // headerShown: false
                                }
                            }
                        />
                        <Stack.Screen name={'Add'} component={Add} />
                        <Stack.Screen name={'Save'} component={Save} />
                        <Stack.Screen name={'Comments'} component={Comments} />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        );
    }
}
