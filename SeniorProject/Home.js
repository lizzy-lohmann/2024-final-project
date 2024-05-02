
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, ScrollView, Image} from 'react-native';
import  styles  from './styles';
import Footer from "./Footer";
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import Post from "./Post";
import Events from "./Events";


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
const colRef = collection(db, "users");


const Home = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(colRef);
                const eventData = querySnapshot.docs.map((doc) => doc.data());
                setProfiles(eventData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers()
            .catch(error => console.error('Error fetching users:', error));


    }, []);


    const handleSearch = async () => {
        try {
            let querySnapshot;

            if (searchQuery.trim() === '') {
                // If search query is empty, fetch all events
                querySnapshot = await getDocs(colRef);
            } else {
                // Perform a fuzzy search against the Firestore collection
                const startSearch = searchQuery.trim();
                const endSearch = searchQuery.trim() + '\uf8ff'; // Unicode character '\uf8ff' is used to match all possible suffixes

                querySnapshot = await getDocs(query(colRef, where("name", ">=", startSearch), where("name", "<=", endSearch)));
            }

            // Extract the data of each document
            const eventData = querySnapshot.docs.map(doc => doc.data());

            // Set the fetched event data into the events state
            setProfiles(eventData);
        } catch (error) {
            console.error('Error searching events:', error);
        }
    };

    return (
        <View style={styles.fullScreen}>
            <View style={styles.header}>

                <TouchableOpacity onPress={() => {/* Open filter modal or screen */}} >
                    {/*<a href="https://www.flaticon.com/free-icons/filter" title="filter icons">Filter icons created by herikus - Flaticon</a>*/}
                    <Image
                        style={styles.headerButton}
                        source={require('./assets/filter.png')}
                    />
                </TouchableOpacity>
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
                {profiles.map((profile, index) => (
                    <Post key={index} {...profile} navigation={navigation}/>
                ))}
            </ScrollView>

            <Footer navigation={navigation} activeTab="Home" />
        </View>
    );


};


export default Home;
