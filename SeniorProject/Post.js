import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Post = ({ profileImage, name, age, pronouns, bio, profession, interests }) => {
    return (
        <View style={styles.postContainer}>
            <View style={styles.profileHeader}>
                <Image
                    style={styles.avatar}
                    source={{ uri: profileImage }}
                />
                <View style={styles.profileText}>
                    <Text style={styles.name}>{name}, {age}</Text>
                    <Text>{pronouns}</Text>
                </View>
                <View style={styles.message}>
                    {/*Add button message functionality... maybe here?                                JUSTIN/CHASE*/}
                    <TouchableOpacity >
                        <Image
                            style={styles.likeButton}
                            source={require('./assets/chat.png')}
                        />
                        {/*<a href="https://www.flaticon.com/free-icons/message" title="message icons">Message icons created by mattbadal - Flaticon</a>*/}
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.bio}>{bio}</Text>
            <View style={styles.profileFooter}>
                {/*Add button like functionality... maybe here?                                JUSTIN/CHASE*/}
                <TouchableOpacity >
                    <Image
                        style={styles.likeButton}
                        source={require('./assets/star.png')}
                    />
                    {/* <a href="https://www.flaticon.com/free-icons/ui" title="ui icons">Ui icons created by Rakib Hassan Rahim - Flaticon</a> */}
                </TouchableOpacity>
                <View style={styles.profileTextTwo}>
                    <Text>{profession}</Text>
                    <Text>{interests.join(' ~ ')}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: '#fbfafd',
        borderRadius: 20,
        padding: 16,
        marginVertical: 12,
        marginHorizontal: 16,
        shadowColor: '#815cac',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.7,
        shadowRadius: 1.41,
        elevation: 2,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',

    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#C4C4C4',
    },
    profileText: {
        marginLeft: 8,
        alignItems: 'left',
    },
    profileTextTwo: {
        marginLeft: 40,
        alignItems: 'center',

    },
    name: {
        fontWeight: 'bold',
    },
    bio: {
        marginTop: 10,
    },
    profileFooter: {
        marginTop: 8,
        flexDirection: 'row',
        textAlign: 'center',
    },
    likeButton: {
        width: 35,
        height: 35,
    },
    message: {
        right: 2,
        top: 6,
        position: 'absolute',
        width: 45,
        height: 45,
    }
});

export default Post;