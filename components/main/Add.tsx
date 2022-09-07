import { Camera, CameraType } from 'expo-camera';
import { isNil } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

export const Add = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState<CameraType>(CameraType.back);
    const cameraRef = useRef(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);
    if (isNil(hasPermission)) {
        return <View />;
    }
    if (!hasPermission) {
        return <Text>No access to camera</Text>;
    }

    const takePicture = async () => {
        if (cameraRef?.current) {
            const picture = await cameraRef.current.takePictureAsync(null);
            setImage(picture.uri);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.cameraContainer}>
                <Camera
                    style={styles.fixedRatio}
                    type={type}
                    ratio={'1:1'}
                    ref={cameraRef}
                />
            </View>
            <Button
                title={'Flip Image'}
                onPress={() => {
                    setType(
                        type === CameraType.back
                            ? CameraType.front
                            : CameraType.back
                    );
                }}
            />
            <Button title={'take photo'} onPress={() => takePicture()} />
            {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
        </View>
    );
};

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    }
});
