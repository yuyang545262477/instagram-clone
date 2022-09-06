import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase/compat';
import React from 'react';
import Loading from './components/auth/loading';
import Login from './components/auth/login';
import Register from './components/auth/register';
import { firebaseConfig } from './private-config/firebase.config';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Landing'}>
                <Stack.Screen
                    name={'Landing'}
                    component={Loading}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen name={'Register'} component={Register} />
                <Stack.Screen name={'Login'} component={Login} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
