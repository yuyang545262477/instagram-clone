import React, { Component } from 'react';
import { Button, TextInput, View } from 'react-native';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        };
        this.onSignUp = this.onSignUp.bind(this);
    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder={'name'}
                    onChangeText={(name) => this.setState({ name })}
                />
                <TextInput
                    placeholder={'email'}
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput
                    placeholder={'password'}
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />
                <Button onPress={() => this.onSignUp()} title={'Sign Up'} />
            </View>
        );
    }

    private onSignUp() {}
}

export default Register;
