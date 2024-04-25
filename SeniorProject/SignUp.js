import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, KeyboardAvoidingView,  Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { launchImageLibrary } from 'react-native-image-picker';




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
const colRef = collection(db, "users");

const checkUser = async (uName) => {
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
}

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

    const createAccount = async () => {
        const colRef = collection(db, "users")
        const querySnapshot = await getDocs(query(collection(db, "users"), where("username", "==", username)));
        if (!querySnapshot.empty) {
            // Username already exists, display message to the user
            alert("Username already exists. Please choose a different username.");
            return; // Exit the function without adding the user
        }
        try {
            const newUser = {
                username: username,
                password: password,
                name: name,
                pronouns: pronouns,
                birthday: birthday,
                profession: profession,
                interests: interests,
                aboutMe: aboutMe,
                location: location,
            };
            const docRef = await addDoc(colRef, newUser);
            console.log("New user added with ID: ", docRef.id);
            // Reset input fields after successful user creation
            setUsername('');
            setPassword('');
            setName('');
            setPronouns('');
            setBirthday('');
            setProfession('');
            setInterests('');
            setAboutMe('');
            setLocation('');
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error creating account:', error);
        }
    };
    const [selectedCity, setSelectedCity] = useState(setLocation);

    const handleLocationChange = (itemValue) => {
        setSelectedCity(itemValue);
        setLocation(itemValue);
    };

    const toggleShowPassword = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };


    const [avatarUri, setAvatarUri] = useState(null);

    // Function to handle the selection of an avatar
    const handleChoosePhoto = () => {
        const options = { noData: true, mediaType: 'photo' };
        launchImageLibrary(options, response => {
            if (response.uri) {
                setAvatarUri(response.uri);
            }
        });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >

        <View style={styles.container}>
            <Text style={styles.name}>UniLink</Text>
            <Text style={styles.slogin}>The App That Brings Us Together</Text>

            <TouchableOpacity onPress={handleChoosePhoto} style={styles.avatarPlaceholder}>
                {avatarUri ? (
                    <Image source={{ uri: avatarUri }} style={styles.avatar} />
                ) : (
                    <Text style={styles.avatarPlaceholderText}>Choose Photo</Text>
                )}
            </TouchableOpacity>

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
                placeholder="Birthday (January 1, 2000)"
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

            <View style={styles.inputPicker}>
                <Picker
                    selectedValue={selectedCity}
                    onValueChange={handleLocationChange}
                    style={styles.picker}
                >
                    <Picker.Item label="Des Moines, IA" value="Des Moines, IA" />
                    <Picker.Item label="Chicago, IL" value="Chicago, IL" />
                    <Picker.Item label="Minneapolis, MN" value="Minneapolis, MN" />
                </Picker>
            </View>



            <Button title="Create Account" onPress={createAccount} />

        </View>
        </KeyboardAvoidingView>
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
    name: {
        fontWeight: 'bold',
        color: '#561d98',
        fontSize: 48,
    },
    slogin: {
        fontWeight: 'bold',
        color: '#815cac',
        fontSize: 20,
    },
    inputPicker: {
        width: '100%',
        height: 40,
        marginVertical: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    picker: {
        height: undefined,
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
    avatarPlaceholder: {
        width: 120,
        height: 135,
        borderRadius: 65,
        backgroundColor: '#cfb8ec',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    avatarPlaceholderText: {
        color: '#000',
        textAlign: 'center',
    },
    avatar: {
        width: 120,
        height: 135,
        borderRadius: 65,
        backgroundColor: '#cfb8ec',
    },
});
export default SignUp;