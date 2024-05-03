import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import styles from './styles';

const Footer = ({ navigation, activeTab }) => {
    const [currentUserLocation, setCurrentUserLocation] = useState(null);

    useEffect(() => {
        const fetchCurrentUserLocation = async () => {
            try {
                // Get userID from AsyncStorage
                const userID = await AsyncStorage.getItem('userID');
                if (userID) {
                    // Fetch currentUserLocation from Firestore based on userID
                    const db = getFirestore();
                    const userRef = doc(db, 'users', userID);
                    const userSnapshot = await getDoc(userRef);
                    const userData = userSnapshot.data();
                    if (userData && userData.location) {
                        setCurrentUserLocation(userData.location);
                    }
                }
            } catch (error) {
                console.error('Error fetching currentUserLocation:', error);
            }
        };

        fetchCurrentUserLocation();
    }, []);

    return (
        <View style={styles.footer}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Home', { currentUserLocation })}
                style={[
                    styles.footerButton,
                    activeTab === 'Home' && styles.activeFooterButton
                ]}
            >
                <Image
                    style={styles.footerButtonImage}
                    source={require('./assets/home.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Calendar')}
                style={[
                    styles.footerButton,
                    activeTab === 'Calendar' && styles.activeFooterButton
                ]}
            >
                <Image
                    style={styles.footerButtonImage}
                    source={require('./assets/calendar-check.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Messaging')}
                style={[
                    styles.footerButton,
                    activeTab === 'Messaging' && styles.activeFooterButton
                ]}
            >
                <Image
                    style={styles.footerButtonImage}
                    source={require('./assets/message.png')}
                />
                {/*<a href="https://www.flaticon.com/free-icons/message" title="message icons">Message icons created by joalfa - Flaticon</a>*/}
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
                style={[
                    styles.footerButton,
                    activeTab === 'Profile' && styles.activeFooterButton
                ]}
            >
                <Image
                    style={styles.footerButtonImage}
                    source={require('./assets/user.png')}
                />
                {/*<a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Freepik - Flaticon</a>*/}
            </TouchableOpacity>
        </View>
    );
};

export default Footer;
