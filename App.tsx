import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase/compat';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Loading from './components/auth/loading';
import Login from './components/auth/login';
import Register from './components/auth/register';
import { firebaseConfig } from './private-config/firebase.config';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

interface AppState {
    loaded: boolean;
    loggedIn: boolean;
}

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
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>User is logged in</Text>
            </View>
        );
    }
}

// export default function App() {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator initialRouteName={'Landing'}>
//                 <Stack.Screen
//                     name={'Landing'}
//                     component={Loading}
//                     options={{
//                         headerShown: false
//                     }}
//                 />
//                 <Stack.Screen name={'Register'} component={Register} />
//                 <Stack.Screen name={'Login'} component={Login} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// }
