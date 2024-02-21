import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
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
        // static data bellow for example
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
                <TouchableOpacity onPress={() => {/* Open filter modal or screen */}} style={styles.headerButton}>
                    <Text style={styles.headerButtonText}>Filters</Text>
                </TouchableOpacity>
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
                {profiles.map((profile, index) => (
                    <Post key={index} {...profile} />
                ))}
            </ScrollView>
            <Footer navigation={navigation} />
        </View>
    );
};

export default Home;
