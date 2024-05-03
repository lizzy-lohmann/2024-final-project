import React, { useState } from 'react';
import {View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyCX2PhLpEJX_n39XVit_bjCz-XFiQaIn-Y",
    authDomain: "seniordesign-ae10f.firebaseapp.com",
    projectId: "seniordesign-ae10f",
    storageBucket: "seniordesign-ae10f.appspot.com",
    messagingSenderId: "230961872715",
    appId: "1:230961872715:web:6e830a80f457c42770b2ce",
    measurementId: "G-H4KWB4XWGK",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colRef = collection(db, 'users');

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [currentUserLocation, setCurrentUserLocation] = useState(null); // State to store current user's location


    const handleLogin = async () => {
        try {
            const querySnapshot = await getDocs(query(colRef, where('username', '==', username), where('password', '==', password)));
            if (!querySnapshot.empty) {
                const user = querySnapshot.docs[0]; // Assuming username is unique
                const userID = user.id;
                const userData = user.data();
                const userLocation = userData.location;
                setCurrentUserLocation(userLocation);
                console.log(username);
                console.log(userID);
                console.log(userLocation);

                await AsyncStorage.setItem('userID', userID); // Store user information in AsyncStorage
                await AsyncStorage.setItem('username', username);
                navigation.replace('Home', { currentUserLocation: userLocation});
            } else {
                Alert.alert('Invalid credentials', 'Username or password is incorrect.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.name}>UniLink</Text>
            <Text style={styles.slogin}>The App That Brings Us Together</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <Button title="Login" onPress={handleLogin} />
            <View style={styles.signupPrompt}>
                <Text>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signupText}>Sign up</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: '100%',
        height: 40,
        marginVertical: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    signupPrompt: {
        flexDirection: 'row',
        marginTop: 20,
    },
    signupText: {
        fontWeight: 'bold',
        color: 'blue',
    },
    name: {
        fontWeight: 'bold',
        color: '#561d98',
        fontSize: 48,
    },
    slogin: {
        fontWeight: 'bold',
        color: '#815cac',
        fontSize: 20,
    }
});

export default Login;
