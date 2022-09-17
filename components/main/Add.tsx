import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo, ImagePickerCancelledResult } from 'expo-image-picker';
import { isNil } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

export const Add = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [type, setType] = useState<CameraType>(CameraType.back);
    const cameraRef = useRef(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
            const galleryStatus =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);
    if (isNil(hasCameraPermission) || isNil(hasGalleryPermission)) {
        return <View />;
    }
    if (!hasCameraPermission || !hasGalleryPermission) {
        return <Text>No access to camera</Text>;
    }

    const takePicture = async () => {
        if (cameraRef?.current) {
            const picture = await cameraRef.current.takePictureAsync(null);
            setImage(picture.uri);
        }
    };

    const pickImage = async () => {
        let result: ImagePickerCancelledResult | ImageInfo =
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            });

        console.log(result);

        if (!result.cancelled) {
            setImage((result as ImageInfo).uri);
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
            <Button title={'pick Image'} onPress={() => pickImage()} />
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
