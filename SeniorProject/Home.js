import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from './styles';
import Footer from './Footer';

const HomeScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        // Implement your search functionality
        console.log('Searching for:', searchQuery);
    };
    return (
        <View style={styles.container}>
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
            <View style={styles.content}>
                <Text>Home Screen Content</Text>
            </View>
            <Footer navigation={navigation} />
        </View>
    );
};

export default HomeScreen;
