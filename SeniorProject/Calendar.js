import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import  styles  from './styles';
import Footer from "./Footer";

const Calendar = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Custom Header */}
            <View style={styles.header}>
                {/* Other header content */}
            </View>

            {/* Screen Content */}
            <View style={styles.content}>
                <Text>Calendar Screen Content</Text>
            </View>

            {/* Custom Footer */}
            <Footer navigation={navigation} />
        </View>
    );
};

export default Calendar;