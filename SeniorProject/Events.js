import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Events = ({ title, date, time, description, RSVP, socials }) => {
    return (
        <View style={styles.eventContainer}>
            <View style={styles.profileHeader}>
                <View style={styles.eventHeader}>
                    <Text style={styles.name}>{title}</Text>
                    <Text>{date}</Text>
                    <Text>{time}</Text>
                </View>
            </View>
            <Text style={styles.bio}>{description}</Text>
            <View style={styles.eventFooter}>
                {/*Add button functionality... maybe here?                                JUSTIN/CHASE*/}
                <TouchableOpacity >
                    <Image
                        style={styles.likeButton}
                        source={require('./assets/star.png')}
                    />
                    {/* <a href="https://www.flaticon.com/free-icons/ui" title="ui icons">Ui icons created by Rakib Hassan Rahim - Flaticon</a> */}
                </TouchableOpacity>
                <View style={styles.footerText}>
                    <Text>{RSVP}</Text>
                    <Text>{socials.join(' ~ ')}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    eventContainer: {
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
    eventHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerText: {
        marginLeft: 40,
        alignItems: 'center',

    },
    name: {
        fontWeight: 'bold',
    },
    bio: {
        marginTop: 10,
    },
    eventFooter: {
        marginTop: 8,
        flexDirection: 'row',
        textAlign: 'center',
    },
    likeButton: {
        width: 35,
        height: 35,
    },
});

export default Events;