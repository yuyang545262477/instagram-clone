import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

const Feed = (props) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        let posts = [];
        if (props.usersLoaded === props.following.length) {
            for (let i = 0; i < props.following.length; i++) {
                const user = props.users.find(
                    (el) => el.uid === props.following[i]
                );
                if (user != undefined) {
                    posts = [...posts, ...user.posts];
                }
            }
            posts.sort((x, y) => x.creation - y.creation);
            setPosts(posts);
        }
    }, [props.usersLoaded]);
    return (
        <View style={styles.container}>
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    renderItem={({ item }) => (
                        <View style={styles.containerImage}>
                            <Text style={styles.container}>
                                {item.user.name}
                            </Text>
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
        // flex: 1,
        aspectRatio: 1
    }
});

const mapStateToProps = (state) => {
    return {
        currentUser: state.userState.currentUser,
        following: state.userState.following,
        users: state.usersState.users,
        usersLoaded: state.usersState.usersLoaded
    };
};

export default connect(mapStateToProps, null)(Feed);
