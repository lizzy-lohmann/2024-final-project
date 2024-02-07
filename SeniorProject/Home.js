import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import  styles  from './styles';

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>Header</Text>
            </View>
            <View style={styles.content}>
                <Text>Home Screen</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}
                    style={styles.footerButton}
                >
                    <Text style={styles.footerButtonText}>Go to Profile</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                {/* Footer buttons go here */}
                {/* ... */}
            </View>
        </View>
    );
};

export default Home;