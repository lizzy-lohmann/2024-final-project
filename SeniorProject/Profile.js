import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import  styles  from './styles';

const Profile = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Profile Screen</Text>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ padding: 10, backgroundColor: 'green' }}
            >
                <Text style={{ color: 'white' }}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Profile;