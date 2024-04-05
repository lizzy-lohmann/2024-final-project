import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
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
                <Image
                    style={styles.footerButtonImage}
                    source={require('./assets/home.png')}
                />
                {/*<a href="https://www.flaticon.com/free-icons/home-button" title="home button icons">Home button icons created by Freepik - Flaticon</a>*/}
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
                {/*<a href="https://www.flaticon.com/free-icons/events" title="events icons">Events icons created by SeyfDesigner - Flaticon</a>*/}
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
