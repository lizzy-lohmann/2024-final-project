import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const Footer = ({ navigation, activeTab }) => {
    return (
        <View style={styles.footer}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={[
                    styles.footerButton,
                    activeTab === 'Home' && styles.activeFooterButton
                ]}
            >
                <Text style={styles.footerButtonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Calendar')}
                style={[
                    styles.footerButton,
                    activeTab === 'Calendar' && styles.activeFooterButton
                ]}
            >
                <Text style={styles.footerButtonText}>Calendar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Messaging')}
                style={[
                    styles.footerButton,
                    activeTab === 'Messaging' && styles.activeFooterButton
                ]}
            >
                <Text style={styles.footerButtonText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
                style={[
                    styles.footerButton,
                    activeTab === 'Profile' && styles.activeFooterButton
                ]}
            >
                <Text style={styles.footerButtonText}>Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Footer;
