import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs } from "firebase/firestore";



// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
// var firebase = require('firebase/app');
// const { getDatabase, ref, onValue, set, update, get } = require('firebase/database');
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//import firebase from 'firebase/app';
//import 'firebase/database';


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
const colRef = collection(db, "users")

const SignUp = ({ navigation }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from Firestore
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(colRef);
                const userData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUsers(userData);
                console.log(userData); // Print users data to the console
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers()
            .catch(error => console.error('Error fetching users:', error));

    }, []); // Empty dependency array to ensure this effect runs only once


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [pronouns, setPronouns] = useState('');
    const [birthday, setBirthday] = useState('');
    const [profession, setProfession] = useState('');
    const [interests, setInterests] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [location, setLocation] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const createAccount = () => {

        const values = {
            user: {
                username: username,
                password: password, // Not recommended to store passwords like this, just for demonstration
                name: name,
                pronouns: pronouns,
                birthday: birthday,
                profession: profession,
                interests: interests,
                aboutMe: aboutMe,
                location: location
            }
        };

        // Perform login logic                                 JUSTIN/CHASE
        console.log('Account made with username:', username, 'and password:', password);
        navigation.navigate('Home');
    };
    const toggleShowPassword = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };


    return (
        <View style={styles.container}>
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
                secureTextEntry={!isPasswordVisible}
            />
            <View style={styles.checkboxContainer}>
                {/*
                <Box
                    value={isPasswordVisible}
                    onValueChange={toggleShowPassword}
                />
                */}
                <Text>Show Password</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Pronouns"
                value={pronouns}
                onChangeText={setPronouns}
            />
            <TextInput
                style={styles.input}
                placeholder="Birthday"
                value={birthday}
                onChangeText={setBirthday}
            />
            <TextInput
                style={styles.input}
                placeholder="Profession"
                value={profession}
                onChangeText={setProfession}
            />
            <TextInput
                style={styles.input}
                placeholder="Interests (seperate by ',')"
                value={interests}
                onChangeText={setInterests}
            />
            <TextInput
                style={styles.input}
                placeholder="Bio"
                value={aboutMe}
                onChangeText={setAboutMe}
            />
            {/*             Change so location is drop down?                                          */}
            <TextInput
                style={styles.input}
                placeholder="Location"
                value={location}
                onChangeText={setLocation}
            />


            <Button title="Create Account" onPress={createAccount} />


        </View>
    );
};


const styles = StyleSheet.create({
    container: {
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    signupPrompt: {
        flexDirection: 'row',
        marginTop: 20,
    },
    signupText: {
        fontWeight: 'bold',
        color: 'blue',
    },
});
export default SignUp;