import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import Footer from './Footer';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const Profile = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

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
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const saveChanges = () => {
        // Code to save changes to MongoDB database goes here
        setIsEditing(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleEdit} style={styles.headerButton}>
                    <Text style={styles.headerButtonText}>{isEditing ? "Save" : "Edit"}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                {userData && (
                    <>
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
                            <Text style={styles.fieldTitle}>Location:</Text>
                            <View style={[styles.textBox, isEditing && styles.editTextBox]}>
                                {isEditing ? (
                                    <TextInput
                                        style={styles.input}
                                        value={userData.location}
                                        onChangeText={(text) => setUserData({...userData, location: text})}
                                    />
                                ) : (
                                    <Text style={styles.fieldText}>{userData.location}</Text>
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
                    </>
                )}
            </View>

            {/* Custom Footer */}
            <Footer navigation={navigation} />
        </View>
    );
};

export default Profile;
