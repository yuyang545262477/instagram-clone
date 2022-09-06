import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase/compat';
import React from 'react';
import Loading from './components/auth/loading';

const firebaseConfig = {
    apiKey: 'AIzaSyDKz6RMFuREua2Brdhau1crPiHsgOdEH3Y',
    authDomain: 'instagram-clone-b92ac.firebaseapp.com',
    projectId: 'instagram-clone-b92ac',
    storageBucket: 'instagram-clone-b92ac.appspot.com',
    messagingSenderId: '102849493065',
    appId: '1:102849493065:web:e3197c492016c53d646798',
    measurementId: 'G-8DV1NBSCN5'
};

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
            </Stack.Navigator>
        </NavigationContainer>
    );
}
