import { Camera, CameraType } from 'expo-camera';
import { isNil } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export const Add = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState<CameraType>(CameraType.back);
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
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.cameraContainer}>
                <Camera style={styles.fixedRatio} type={type} ratio={'1:1'} />
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
