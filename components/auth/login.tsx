import firebase from 'firebase/compat';
import React, { Component } from 'react';
import { Button, TextInput, View } from 'react-native';

interface IRegisterState {
    email: string;
    password: string;
}

class Login extends Component<{}, IRegisterState> {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.onSignIn = this.onSignIn.bind(this);
    }

    render() {
        return (
            <View>
                {/*<TextInput*/}
                {/*    placeholder={'name'}*/}
                {/*    onChangeText={(name) => this.setState({ name })}*/}
                {/*/>*/}
                <TextInput
                    placeholder={'email'}
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput
                    placeholder={'password'}
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />
                <Button onPress={() => this.onSignIn()} title={'Login'} />
            </View>
        );
    }

    private onSignIn() {
        const { password, email } = this.state;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                // console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export default Login;
