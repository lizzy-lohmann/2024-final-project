import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles'; // Ensure this path is correct to import your styles
import Footer from './Footer';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Custom Header */}
            <View style={styles.header}>
                {/* Other header content */}
            </View>

            {/* Screen Content */}
            <View style={styles.content}>
                <Text>Home Screen Content</Text>
            </View>

            {/* Custom Footer */}
            <Footer navigation={navigation} />
        </View>
    );
};

export default HomeScreen;
