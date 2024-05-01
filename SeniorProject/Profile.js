import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    StyleSheet
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Alert } from 'react-native';
import styles from './styles';
import Footer from './Footer';
import { getFirestore, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';


const Profile = ({ navigation }) => {

    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCity, setSelectedCity] = useState('');

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

    const handleEdit = () => {
             setIsEditing(!isEditing);
         };

    const handleInputChange = (name, value) => {
        {/*                                                                              STILL NEED TO SAVE TO DATABSE*/}
        setUserData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const saveChanges = () => {
        setIsEditing(false);

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
                    onPress: () => deleteProfile()
                },
            ],
            { cancelable: false }
        );
    };
    const deleteProfile = async () => {
        try {
            const username = await AsyncStorage.getItem('username');
            if (!username) {
                console.error('No username found');
                return;
            }

            const db = getFirestore();
            const usersRef = collection(db, 'users');
            const userQuery = query(usersRef, where('username', '==', username));
            const querySnapshot = await getDocs(userQuery);

            if (!querySnapshot.empty) {
                const userDocRef = querySnapshot.docs[0].ref;
                await deleteDoc(userDocRef);
                console.log("Profile deleted successfully.");
                await AsyncStorage.removeItem('username');

                navigation.replace('Login');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            } else {
                console.log("No user found with the given username.");
            }
        } catch (error) {
            console.error('Error deleting profile:', error);
        }
    };



    const confirmLogout = () => {
        Alert.alert(
            'Log Out',
            'Are you sure you want to log out of your profile?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => logoutProfile()
                },
            ],
            { cancelable: false }
        );
    };
    const logoutProfile = () => {
        AsyncStorage.removeItem('username')
            .then(() => {
                navigation.replace('Login');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            })
            .catch((error) => {
                console.error('Error during logout:', error);
            });
    }


    return (
            <View style={styles.fullScreen}>
                <View style={styles.headerProfile}>
                    <TouchableOpacity onPress={handleEdit}>
                        {isEditing ? (
                            <Image
                                style={styles.headerButtonImage}
                                source={require('./assets/save.png')}
                            />
                        ) : (
                            <Image
                                style={styles.headerButtonImage}
                                source={require('./assets/edit.png')}
                            />
                        )}
                    </TouchableOpacity>
                    {/*<a href="https://www.flaticon.com/free-icons/contact" title="contact icons">Contact icons created by bsd - Flaticon</a>*/}
                    {/*<a href="https://www.flaticon.com/free-icons/writer" title="writer icons">Writer icons created by SeyfDesigner - Flaticon</a>*/}
                    {/*<a href="https://www.flaticon.com/free-icons/logout" title="logout icons">Logout icons created by Pixel perfect - Flaticon</a>*/}
                    <TouchableOpacity onPress ={confirmLogout}>
                        <Image
                            style={styles.headerButtonImageTwo}
                            source={require('./assets/logout.png')}
                        />
                    </TouchableOpacity>
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
                            <Text style={styles.fieldTitle}>Location:</Text>
                            <View style={[styles.textBox, isEditing && styles.editTextBox]}>
                            {isEditing ? (
                                <RNPickerSelect
                                    onValueChange={(value) => handleLocationChange(value)}
                                    items={[
                                        { label: 'Des Moines, IA', value: 'Des Moines, IA' },
                                        { label: 'Chicago, IL', value: 'Chicago, IL' },
                                        { label: 'Minneapolis, MN', value: 'Minneapolis, MN' },
                                    ]}
                                    style={pickerSelectStyles}
                                    value={selectedCity}
                                    useNativeAndroidPickerStyle={false}
                                    placeholder={{
                                        label: userData.location,
                                    }}
                                />
                            ) : (
                                    <Text style={styles.fieldText}>{userData.location}</Text>
                            )}
                            </View>
                        </View>
                </ScrollView>
                </KeyboardAvoidingView>
                    </>
                )}
                <Footer navigation={navigation} activeTab="Profile" />
            </View>

    );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        paddingVertical: 12,
        //paddingHorizontal: 10,
        color: 'black',
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
    },
});

export default Profile;
