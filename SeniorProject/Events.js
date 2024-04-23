import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const Events = ({ title, date, time, description, RSVP, instagram, facebook, website }) => {
    const handlePressRSVP = () => {
        Linking.openURL(RSVP).catch(err => console.error("Couldn't load page", err));
    };
    const openLink = (url) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };



    return (
        <View style={styles.eventContainer}>
            <View style={styles.eventHeader}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.dateContainer}>
                    <Text style={styles.date}>{date}</Text>
                    <Text style={styles.time}>{time}</Text>
                </View>
            </View>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.eventFooter}>
                <TouchableOpacity >
                    <Image
                        style={styles.likeButton}
                        source={require('./assets/star.png')}
                    />
                    {/* <a href="https://www.flaticon.com/free-icons/ui" title="ui icons">Ui icons created by Rakib Hassan Rahim - Flaticon</a> */}
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePressRSVP}>
                    <Text style={styles.rsvp}>RSVP</Text>
                </TouchableOpacity>
                <View style={styles.socialsContainer}>
                    <TouchableOpacity onPress={() => openLink(instagram)}>
                        <Text style={styles.socialText}>Instagram</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openLink(facebook)}>
                        <Text style={styles.socialText}>Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openLink(website)}>
                        <Text style={styles.socialText}>{website}</Text>
                    </TouchableOpacity>
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
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        flex: 1,
    },
    dateContainer: {
        alignItems: 'flex-end',
    },
    date: {
        fontSize: 16,
    },
    time: {
        fontSize: 16,
    },
    description: {
        marginTop: 10,
    },
    eventFooter: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    likeButton: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    rsvp: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginLeft: 2,
        marginTop: 40,
        fontSize: 14,
    },
    socialsContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        flex: 1,
        marginRight: 10,
    },
    socialText: {
        fontSize: 14,
        color: '#561d98',
        fontWeight: 'bold',
    },
});

export default Events;
