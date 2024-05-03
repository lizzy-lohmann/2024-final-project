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
                title: 'Vues Dueling Pianos' ,
                date: 'May 3rd, 2024',
                time: '10PM-1AM',
                description: 'Felix and Fingers Dueling Pianos is a high-energy, all-request sing-along show. This interactive act brings together music and comedy for a night you’ll be laughing about for weeks!',
                RSVP: 'https://www.vuerooftop-ic.com/duelingpianos',
                instagram: 'https://www.instagram.com/vuerooftop/',
                facebook: 'https://www.facebook.com/vuerooftop',
                website: 'https://www.vuerooftop-ic.com/vue-nique-events',
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