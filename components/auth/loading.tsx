import React from 'react';
import { Button, View } from 'react-native';

export default ({ navigation }) => (
    <View style={{ flex: 1, justifyContent: 'center' }}>
        <Button
            title={'register' + ''}
            onPress={() => navigation.navigate('Register')}
        />
        <Button title={'logina'} onPress={() => navigation.navigate('Login')} />
    </View>
);
