import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, TextInput, ScrollView, Image, StyleSheet} from 'react-native';
import styles from './styles';
import Footer from './Footer';
import Post from "./Post";

const Home = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        // Implement your search functionality                                            JUSTIN/CHASE
        console.log('Searching for:', searchQuery);
    };
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        // Fetch the profile data from your backend or local storage                       JUSTIN/CHASE
        // static data bellow for example         change for collected data from database
        const fetchedProfiles = [
            {
                profileImage: 'https://example.com/image1.jpg',
                name: 'John Doe',
                age: '30',
                pronouns: 'He/Him',
                bio: 'Bio for John',
                profession: 'Software Engineer',
                interests: ['Coding', 'Tech', 'Gaming', 'Reading'],
            },
            {
                profileImage: 'https://example.com/image2.jpg',
                name: 'Jane Smith',
                age: '28',
                pronouns: 'She/Her',
                bio: 'Bio for Jane',
                profession: 'Graphic Designer',
                interests: ['Art', 'Design', 'Photography', 'Gaming'],
            },
        ];
        setProfiles(fetchedProfiles);
    }, []);

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
                    <Post key={index} {...profile} />
                ))}
            </ScrollView>
            <Footer navigation={navigation}/>
        </View>
    );
};


export default Home;
