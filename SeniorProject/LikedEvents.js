import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, ScrollView, Image} from 'react-native';
import  styles  from './styles';
import Footer from "./Footer";
import Events from "./Events";

const LikedEvents = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        // Implement your search functionality                                            JUSTIN/CHASE
        console.log('Searching for:', searchQuery);
    };

    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch the profile data from your backend or local storage                       JUSTIN/CHASE
        // static data bellow for example         change for collected data from database
        const fetchedEvents = [
            {
                title: 'Readers Luncheon',
                date: 'April 15th 2024',
                time: '12:00pm',
                description: 'Do you love to read? Come to Pollys Soups for a luncheon and meet other readers! Bring your favorite book! ',
                RSVP: 'N/A',
                instagram: 'https://www.instagram.com/bgogel02/',
                facebook: 'N/A',
                website: 'https://github.com/lizzy-lohmann/2024-final-project/tree/BB'
            },
            {
                title: 'Vues Social',
                date: 'May 20th 2024',
                time: '7-11pm',
                description: 'Want to meet new people around your age? The Vue is hosting a social for young people in their 20s! Come gather have drinks and appetizers',
                RSVP: 'www.rsvp.com',
                instagram: 'https://www.instagram.com/lizzy_lohmann33/',
                facebook: 'N/A',
                website: 'https://github.com/lizzy-lohmann/2024-final-project/tree/Lizzy',
            },
        ];
        setEvents(fetchedEvents);
    }, []);
    const goToEvents = () => {
        navigation.navigate('Calendar');
    };

    return (
        <View style={styles.fullScreen}>
            <View style={styles.header}>
                <TextInput
                    style={styles.searchInput}
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    source={require('./assets/find.png')}
                    placeholderTextColor="#000000"
                    returnKeyType="search"
                    onSubmitEditing={handleSearch}
                />
                <Image
                    style={styles.headerButton}
                    source={require('./assets/find.png')}
                />
                {/*<a href="https://www.flaticon.com/free-icons/magnifier" title="magnifier icons">Magnifier icons created by The Icon Tree - Flaticon</a>*/}
            </View>
            <ScrollView style={styles.container}>
                {events.map((event, index) => (
                    <Events key={index} {...event} />
                ))}
            </ScrollView>
            <TouchableOpacity onPress={goToEvents} style ={styles.subFooter} >
                <Text style={styles.subFooterText}>All Events</Text>
            </TouchableOpacity>
            <Footer navigation={navigation} activeTab="Calendar" />
        </View>
    );
};
export default LikedEvents;