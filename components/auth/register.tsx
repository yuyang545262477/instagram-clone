import firebase from 'firebase/compat';
import React, { Component } from 'react';
import { Button, TextInput, View } from 'react-native';

interface IRegisterState {
    email: string;
    password: string;
    name: string;
}

class Register extends Component<{}, IRegisterState> {
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

    private onSignUp() {
        const { password, email, name } = this.state;
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                firebase
                    .firestore()
                    .collection('users')
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name,
                        email
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export default Register;
