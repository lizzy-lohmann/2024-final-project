import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import  styles  from './styles';
import Footer from "./Footer";
import Events from "./Events";

const Calendar = ({ navigation }) => {
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
                socials: ['insta: @pollysSoup', 'facebook: Pollys Soup'],
            },
            {
                title: 'Vues Social',
                date: 'May 20th 2024',
                time: '7-11pm',
                description: 'Want to meet new people around your age? The Vue is hosting a social for young people in their 20s! Come gather have drinks and appetizers',
                RSVP: 'www.rsvp.com',
                socials: ['inst: @vueRoof', 'www.vueRooftop.com', 'facebook: Vue Rooftop'],
            },
        ];
        setEvents(fetchedEvents);
    }, []);

    return (
        <View style={styles.fullScreen}>
            <View style={styles.header}>
                <TextInput
                    style={styles.searchInput}
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    placeholder="Search"
                    placeholderTextColor="#000000"
                    returnKeyType="search"
                    onSubmitEditing={handleSearch}
                />
                <TouchableOpacity onPress={handleSearch} style={styles.headerButton}>
                    <Text style={styles.headerButtonText}>Search</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.container}>
                {events.map((event, index) => (
                    <Events key={index} {...event} />
                ))}
            </ScrollView>
            <Footer navigation={navigation} />
        </View>
    );
};

export default Calendar;