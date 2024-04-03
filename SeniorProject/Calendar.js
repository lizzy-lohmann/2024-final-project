import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import  styles  from './styles';
import Footer from "./Footer";
import Events from "./Events";
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCX2PhLpEJX_n39XVit_bjCz-XFiQaIn-Y",
    authDomain: "seniordesign-ae10f.firebaseapp.com",
    projectId: "seniordesign-ae10f",
    storageBucket: "seniordesign-ae10f.appspot.com",
    messagingSenderId: "230961872715",
    appId: "1:230961872715:web:6e830a80f457c42770b2ce",
    measurementId: "G-H4KWB4XWGK",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colRef = collection(db, "events");

const Calendar = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const querySnapshot = await getDocs(colRef);
                const eventData = querySnapshot.docs.map((doc) => doc.data());
                setEvents(eventData);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents()
            .catch(error => console.error('Error fetching users:', error));

    }, []);
    const handleSearch = () => {
        // Implement your search functionality                                            JUSTIN/CHASE
        console.log('Searching for:', searchQuery);
    };


    // useEffect(() => {
    //     // Fetch the profile data from your backend or local storage                       JUSTIN/CHASE
    //     // static data bellow for example         change for collected data from database
    //     const fetchedEvents = [
    //         {
    //             title: 'Readers Luncheon',
    //             date: 'April 15th 2024',
    //             time: '12:00pm',
    //             description: 'Do you love to read? Come to Pollys Soups for a luncheon and meet other readers! Bring your favorite book! ',
    //             RSVP: 'N/A',
    //             instagram: 'https://www.instagram.com/bgogel02/',
    //             facebook: 'N/A',
    //             website: 'https://github.com/lizzy-lohmann/2024-final-project/tree/BB'
    //         },
    //         {
    //             title: 'Vues Social',
    //             date: 'May 20th 2024',
    //             time: '7-11pm',
    //             description: 'Want to meet new people around your age? The Vue is hosting a social for young people in their 20s! Come gather have drinks and appetizers',
    //             RSVP: 'www.rsvp.com',
    //             instagram: 'https://www.instagram.com/lizzy_lohmann33/',
    //             facebook: 'N/A',
    //             website: 'https://github.com/lizzy-lohmann/2024-final-project/tree/Lizzy',
    //         },
    //     ];
    //     setEvents(fetchedEvents);
    // }, []);
    const likedEvents = () => {
        setEvents(likedEvents);
    };

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
            <TouchableOpacity onPress={likedEvents} style ={styles.subFooter} >
                <Text style={styles.subFooterText}>My Liked Events</Text>
            </TouchableOpacity>
            <Footer navigation={navigation} />
        </View>
    );
};
export default Calendar;