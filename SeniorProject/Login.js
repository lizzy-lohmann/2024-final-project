import React, { useState } from 'react';
import {View, Text, TextInput, Button, TouchableOpacity, StyleSheet} from 'react-native';


const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);


    const handleLogin = () => {
        // Perform login logic
        console.log('Login pressed with username:', username, 'and password:', password);
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


export default Login;