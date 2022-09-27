import firebase from 'firebase/compat';
import React, { useState } from 'react';

import {
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const Search = (props) => {
    const [users, setUsers] = useState([]);
    const fetchUsers = (search) => {
        firebase
            .firestore()
            .collection('users')
            .where('name', '>=', search)
            .get()
            .then((snapshot) => {
                let users = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    const id = doc.id;
                    return {
                        id,
                        ...data
                    };
                });
                setUsers(users);
            });
    };
    return (
        <View>
            <TextInput
                placeholder={'Type Here'}
                onChangeText={(search) => fetchUsers(search)}
            />
            <FlatList
                data={users}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            props.navigation.navigate('Profile', {
                                uid: item.id
                            })
                        }
                    >
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )}
                numColumns={1}
                horizontal={false}
            />
        </View>
    );
};

export default Search;
