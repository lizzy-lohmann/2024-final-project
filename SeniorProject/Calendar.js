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


    const handleSearch = async () => {
        // Implement your search functionality
        try {
            let querySnapshot;

            if (searchQuery.trim() === '') {
                // If search query is empty, fetch all events
                querySnapshot = await getDocs(colRef);
            } else {
                // Perform a fuzzy search against the Firestore collection
                const startSearch = searchQuery.trim();
                const endSearch = searchQuery.trim() + '\uf8ff'; // Unicode character '\uf8ff' is used to match all possible suffixes

                querySnapshot = await getDocs(query(colRef, where("title", ">=", startSearch), where("title", "<=", endSearch)));
            }

            // Extract the data of each document
            const eventData = querySnapshot.docs.map(doc => doc.data());

            // Set the fetched event data into the events state
            setEvents(eventData);
        } catch (error) {
            console.error('Error searching events:', error);
        }
    };

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