import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const Footer = ({ navigation }) => {
    return (
        <View style={styles.footer}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={styles.footerButton}
            >
                <Text style={styles.footerButtonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Calendar')}
                style={styles.footerButton}
            >
                <Text style={styles.footerButtonText}>Calendar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Messaging')}
                style={styles.footerButton}
            >
                <Text style={styles.footerButtonText}>Messaging</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
                style={styles.footerButton}
            >
                <Text style={styles.footerButtonText}>Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Footer;
