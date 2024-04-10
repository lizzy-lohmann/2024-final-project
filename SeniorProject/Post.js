import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Post = ({ profileImage, name, age, pronouns, bio, profession, interests, navigation }) => {

    const [liked, setLiked] = useState(false);

    const handleLikePress = () => {
        setLiked(!liked);
        // Here you would also handle the logic to update the like status in your backend/database         JUSTIN/CHASE
    };
    const goToMessage = () => {
        // Here you would also handle the logic to message specific person         JUSTIN/CHASE
        navigation.navigate('Messaging');
    };

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
                    <TouchableOpacity onPress={goToMessage} >
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
                <TouchableOpacity onPress={handleLikePress} style={styles.likeButton}>
                    <Image
                        style={styles.likeButton}
                        source={liked ? require('./assets/likedStar.png') : require('./assets/star.png')}
                    />
                </TouchableOpacity>
                    {/* <a href="https://www.flaticon.com/free-icons/impression-rate" title="impression rate icons">Impression rate icons created by Smashicons - Flaticon</a> */}
                    {/*<a href="https://www.flaticon.com/free-icons/star" title="star icons">Star icons created by Smashicons - Flaticon</a>*/}

                <View style={styles.profileTextTwo}>
                    <Text>{profession}</Text>
                    <Text>{interests}</Text>
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
        padding: 10,

        //backgroundColor: '#d4beef',
        borderWidth: 2,
        borderColor: '#d4beef',
        borderRadius: 10,

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
        right: 8,
        top: 4,
        position: 'absolute',
        width: 25,
        height: 25,
    }
});

export default Post;