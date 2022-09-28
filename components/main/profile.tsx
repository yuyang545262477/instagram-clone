import firebase from 'firebase/compat';
import React, { useEffect, useState } from 'react';

import { Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

const Profile = (props) => {
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [following, setFollowing] = useState(false);
    useEffect(() => {
        const { currentUser, posts } = props;
        if (props.route.params.uid === firebase.auth().currentUser.uid) {
            console.log('is equal');
            setUser(currentUser);
            setUserPosts(posts);
            return;
        } else {
            firebase
                .firestore()
                .collection('users')
                .doc(props.route.params.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUser(snapshot.data());
                    } else {
                        console.log('No data available');
                    }
                });
            firebase
                .firestore()
                .collection('posts')
                .doc(firebase.auth().currentUser.uid)
                .collection('userPosts')
                .orderBy('creation', 'asc')
                .get()
                .then((snapshot) => {
                    let posts = snapshot.docs.map((doc) => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data };
                    });
                    console.log(posts);
                    // dispatch({
                    //     type: USER_POSTS_STATE_CHANGE,
                    //     posts
                    // });
                    setUserPosts(posts);
                });
        }

        if (props.following.indexOf(props.route.params.uid) > -1) {
            setFollowing(true);
        } else {
            setFollowing(false);
        }
    }, [props.route.params.uid, props.following]);
    if (!user) {
        return <View />;
    }

    const onFollow = () => {
        firebase
            .firestore()
            .collection('following')
            .doc(firebase.auth().currentUser.uid)
            .collection('userFollowing')
            .doc(props.route.params.uid)
            .set({});
    };

    const onUnfollow = () => {
        firebase
            .firestore()
            .collection('following')
            .doc(firebase.auth().currentUser.uid)
            .collection('userFollowing')
            .doc(props.route.params.uid)
            .delete();
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <Text>{user.name}</Text>
                <Text>{user.email}</Text>
                {/*    增加 following标签*/}
                {props.route.params.uid !== firebase.auth().currentUser.uid ? (
                    <View>
                        {following ? (
                            <Button
                                title={'Following'}
                                onPress={() => onUnfollow()}
                            />
                        ) : (
                            <Button
                                title={'Follow'}
                                onPress={() => onFollow()}
                            />
                        )}
                    </View>
                ) : null}
            </View>
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={userPosts}
                    renderItem={({ item }) => (
                        <View style={styles.containerImage}>
                            <Image
                                source={{ uri: item.downloadUrl }}
                                style={styles.image}
                            />
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerInfo: {
        margin: 20
    },
    containerGallery: {
        flex: 1
    },
    containerImage: {
        flex: 1 / 3
    },
    image: {
        flex: 1,
        aspectRatio: 1
    }
});

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following
});

export default connect(mapStateToProps, null)(Profile);
