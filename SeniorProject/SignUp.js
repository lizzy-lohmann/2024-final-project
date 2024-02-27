import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';


const SignUp = ({ navigation }) => {
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