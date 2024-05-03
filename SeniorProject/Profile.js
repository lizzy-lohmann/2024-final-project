import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, TouchableOpacity, TextInput, Image, ScrollView, KeyboardAvoidingView,  Platform} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Alert } from 'react-native';
import styles from './styles';
import Footer from './Footer';
import {getFirestore, collection, query, where, getDocs, setDoc, doc} from 'firebase/firestore';


const Profile = ({ navigation }) => {

    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCity, setSelectedCity] = useState('');
    const [editedUserData, setEditedUserData] = useState({});
    const [currentUserLocation, setCurrentUserLocation] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const username = await AsyncStorage.getItem('username');
                if (username) {
                    const db = getFirestore();
                    const usersRef = collection(db, 'users');
                    const userQuery = query(usersRef, where('username', '==', username));
                    const querySnapshot = await getDocs(userQuery);
                    if (!querySnapshot.empty) {
                        const userData = querySnapshot.docs[0].data();
                        setUserData(userData);
                        setSelectedCity(userData.location);
                        setCurrentUserLocation(userData.location); // Set initial currentUserLocation

                    }
                    else {
                        console.log('User not found');
                        // Handle case where user data is not found
                    }
                }else {
                    console.log('UserID not found in AsyncStorage');
                    // Handle case where userID is not found in AsyncStorage
                }

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const handleLocationChange = (itemValue) => {
        setSelectedCity(itemValue);
        handleInputChange('location', itemValue);
    };

// Modify handleEdit function to reset editedUserData when exiting edit mode
    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

// Modify handleInputChange function to update editedUserData instead of userData
    const handleInputChange = (name, value) => {
        setEditedUserData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

// Implement the function to save changes to the database
    const saveChanges = async () => {
        try {
            if (!userData || !editedUserData) {
                console.error('User data or edited data is missing.');
                return;
            }

            // Merge editedUserData with userData to update only the changed fields
            const updatedUserData = {
                ...userData,
                ...editedUserData
            };

            const userID = await AsyncStorage.getItem('userID');
            const db = getFirestore();
            const userDocRef = doc(db, 'users', userID);

            await setDoc(userDocRef, updatedUserData, { merge: true });

            // Update userData state with the updated data
            setUserData(updatedUserData);

            await AsyncStorage.setItem('currentUserLocation', updatedUserData.location);
            setCurrentUserLocation(updatedUserData.location);
            // Reset editedUserData state
            setEditedUserData({});
            // Exit edit mode
            setIsEditing(false);
            // Show success message if needed
            Alert.alert('Success', 'Profile updated successfully.');
        } catch (error) {
            console.error('Error updating user data:', error);
            // Show error message if needed
            Alert.alert('Error', 'Failed to update profile. Please try again later.');
        }
    };

    const confirmDelete = () => {
        Alert.alert(
            'Delete Profile',
            'Are you sure you want to delete your profile?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => deleteProfile()// Here you would call the function to delete the profile
                },
            ],
            { cancelable: false }
        );
    };
    const deleteProfile = () => {
        //add code to delete profile than go back to login screen
    }


    return (
        <View style={styles.fullScreen}>
            <View style={styles.headerProfile}>
                <TouchableOpacity onPress={isEditing ? saveChanges : handleEdit}>
                    <Image
                        style={styles.headerButtonImage}
                        source={isEditing ? require('./assets/save.png') : require('./assets/edit.png')}
                    />
                </TouchableOpacity>
                {/*<a href="https://www.flaticon.com/free-icons/contact" title="contact icons">Contact icons created by bsd - Flaticon</a>*/}
                {/*<a href="https://www.flaticon.com/free-icons/writer" title="writer icons">Writer icons created by SeyfDesigner - Flaticon</a>*/}
                <TouchableOpacity onPress ={confirmDelete}>
                    <Image
                        style={styles.headerButtonImageTwo} // Make sure to define this style
                        source={require('./assets/delete.png')} // Path to your edit icon
                    />
                    {/*<a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by bsd - Flaticon</a>*/}
                </TouchableOpacity>

            </View>
            {userData && (
                <>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{ flex: 1 }}
                    >
                        <ScrollView style={styles.container}>
                            <View style={styles.avatarContainer}>
                                <View style={styles.avatar}>
                                    <Image
                                        style={styles.avatar}
                                        source={require('./assets/Anna.jpeg')}
                                    />
                                </View>

                                <TouchableOpacity>
                                    <Text>Update Photo</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.fieldContainer}>
                                <Text style={styles.fieldTitle}>Name:</Text>
                                <View style={[styles.textBox, isEditing && styles.editTextBox]}>
                                    {isEditing ? (
                                        <TextInput
                                            style={styles.input}
                                            value={userData.name}
                                            onChangeText={(text) => setUserData({...userData, name: text})}
                                        />
                                    ) : (
                                        <Text style={styles.fieldText}>{userData.name}</Text>
                                    )}
                                </View>
                            </View>

                            <View style={styles.fieldContainer}>
                                <Text style={styles.fieldTitle}>Pronouns:</Text>
                                <View style={[styles.textBox, isEditing && styles.editTextBox]}>
                                    {isEditing ? (
                                        <TextInput
                                            style={styles.input}
                                            value={userData.pronouns}
                                            onChangeText={(text) => setUserData({...userData, pronouns: text})}
                                        />
                                    ) : (
                                        <Text style={styles.fieldText}>{userData.pronouns}</Text>
                                    )}
                                </View>
                            </View>

                            <View style={styles.fieldContainer}>
                                <Text style={styles.fieldTitle}>Profession:</Text>
                                <View style={[styles.textBox, isEditing && styles.editTextBox]}>
                                    {isEditing ? (
                                        <TextInput
                                            style={styles.input}
                                            value={userData.profession}
                                            onChangeText={(text) => setUserData({...userData, profession: text})}
                                        />
                                    ) : (
                                        <Text style={styles.fieldText}>{userData.profession}</Text>
                                    )}
                                </View>
                            </View>

                            <View style={styles.fieldContainer}>
                                <Text style={styles.fieldTitle}>Birthday:</Text>
                                <View style={[styles.textBox, isEditing && styles.editTextBox]}>
                                    {isEditing ? (
                                        <TextInput
                                            style={styles.input}
                                            value={userData.birthday}
                                            onChangeText={(text) => setUserData({...userData, birthday: text})}
                                        />
                                    ) : (
                                        <Text style={styles.fieldText}>{userData.birthday}</Text>
                                    )}
                                </View>
                            </View>

                            <View style={styles.fieldContainer}>
                                <Text style={styles.fieldTitle}>Interests:</Text>
                                <View style={[styles.textBox, isEditing && styles.editTextBox]}>
                                    {isEditing ? (
                                        <TextInput
                                            style={styles.input}
                                            value={userData.interests}
                                            onChangeText={(text) => setUserData({...userData, interests: text})}
                                        />
                                    ) : (
                                        <Text style={styles.fieldText}>{userData.interests}</Text>
                                    )}
                                </View>
                            </View>

                            <View style={styles.fieldContainer}>
                                <Text style={styles.fieldTitle}>About Me:</Text>
                                <View style={[styles.textBox, isEditing && styles.editTextBox]}>
                                    {isEditing ? (
                                        <TextInput
                                            style={styles.input}
                                            value={userData.aboutMe}
                                            onChangeText={(text) => setUserData({...userData, aboutMe: text})}
                                        />
                                    ) : (
                                        <Text style={styles.fieldText}>{userData.aboutMe}</Text>
                                    )}
                                </View>
                            </View>


                            <View style={styles.fieldContainer}>
                                <Text style={styles.fieldTitle}>Location: (Scroll)</Text>
                                {isEditing ? (
                                    <View style={styles.pickerContainer}>
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
                                ) : (
                                    <View style={styles.textBox}>
                                        <Text style={styles.fieldText}>{userData.location}</Text>
                                    </View>
                                )}
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </>
            )}
            <Footer navigation={navigation} activeTab="Profile" />
        </View>

    );
};

export default Profile;
