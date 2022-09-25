import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import React, { useState } from 'react';
import { Button, Image, Text, TextInput, View } from 'react-native';

const Save = (props) => {
    const [caption, setCaption] = useState('');
    const image = props.route.params.image;
    console.log('urI:', image);
    const uploadVideo = async () => {
        try {
            const uri = props.route.params.image;
            const response = await fetch(uri);
            const blob = await response.blob();
            // @ts-ignore
            const childPath = `post/${
                firebase.auth().currentUser.uid
            }/${Math.random().toString(36)}`;
            // @ts-ignore
            const task = firebase.storage().ref().child(childPath).put(blob);
            const taskProgress = (snapshot) => {
                console.log(`transferred: ${snapshot.bytesTransferred}`);
            };
            const taskCompleted = () => {
                task.snapshot.ref.getDownloadURL().then((snapshot) => {
                    console.log(snapshot);
                });
            };
            const taskError = (snapshot) => {
                console.error(snapshot);
            };
            task.on('state_changed', taskProgress, taskError, taskCompleted);
        } catch (error) {
            console.error(`upload video has error:${error}`);
        }
    };

    return (
        <View>
            {image && (
                <>
                    <Image
                        source={{ uri: image }}
                        style={{
                            flex: 1,
                            minWidth: 200,
                            minHeight: 200,
                            backgroundColor: 'red'
                        }}
                    />
                    <TextInput
                        placeholder='Write a caption...'
                        onChangeText={(caption) => setCaption(caption)}
                    />
                    <Button title='Save' onPress={() => uploadVideo()} />
                </>
            )}
            {!image && <Text>no image</Text>}
        </View>
    );
};

export default Save;
