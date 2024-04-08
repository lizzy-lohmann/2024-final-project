import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import { Alert } from 'react-native';
import styles from './styles';
import Footer from "./Footer";

const Profile = ({ navigation }) => {

    const [isEditing, setIsEditing] = useState(false);

    const [profile, setProfile] = useState({
        name: '',
        pronouns: '',
        birthday: '',
        profession: '',
        interests: '',
        aboutMe: '',
        location: '',
        picture: '',
    });

    useEffect(() => {
        // Fetch the user's data from the database when the component mounts and save it to setProfile, sample below
        //userService.getProfileData()
        //           .then(data => {
        //             setProfile(data);
        //           })
    }, []);

    const handleEdit = () => {
             setIsEditing(!isEditing);
         };

    const handleInputChange = (name, value) => {

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
        <View style={styles.container}>
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
                <TouchableOpacity onPress ={confirmDelete}>
                    <Image
                        style={styles.headerButtonImageTwo} // Make sure to define this style
                        source={require('./assets/delete.png')} // Path to your edit icon
                    />
                    {/*<a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by bsd - Flaticon</a>*/}
                </TouchableOpacity>

            </View>


            <View style={styles.content}>
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
                                value={profile.name}
                                onChangeText={(value) => handleInputChange('name', value)}
                            />
                        ) : (
                            <Text style={styles.fieldText}>{profile.name}</Text>
                        )}
                    </View>
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTitle}>Pronouns:</Text>
                    <View style={[styles.textBox, isEditing && styles.editTextBox]}>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={profile.pronouns}
                                onChangeText={(value) => handleInputChange('pronouns', value)}
                            />
                        ) : (
                            <Text style={styles.fieldText}>{profile.pronouns}</Text>
                        )}
                    </View>
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTitle}>Birthday:</Text>
                    <View style={[styles.textBox, isEditing && styles.editTextBox]}>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={profile.birthday}
                                onChangeText={(value) => handleInputChange('birthday', value)}
                            />
                        ) : (
                            <Text style={styles.fieldText}>{profile.birthday}</Text>
                        )}
                    </View>
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTitle}>Profession:</Text>
                    <View style={[styles.textBox, isEditing && styles.editTextBox]}>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={profile.profession}
                                onChangeText={(value) => handleInputChange('profession', value)}
                            />
                        ) : (
                            <Text style={styles.fieldText}>{profile.profession}</Text>
                        )}
                    </View>
                </View>

                {/* About Me */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTitle}>About Me:</Text>
                    <View style={[styles.textBox, isEditing && styles.editTextBox]}>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={profile.aboutMe}
                                onChangeText={(value) => handleInputChange('aboutMe', value)}
                            />
                        ) : (
                            <Text style={styles.fieldText}>{profile.aboutMe}</Text>
                        )}
                    </View>
                </View>


                {/* Interests */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTitle}>Interests:</Text>
                    <View style={[styles.textBox, isEditing && styles.editTextBox]}>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={profile.interests}
                                onChangeText={(value) => handleInputChange('interests', value)}
                            />
                        ) : (
                            <Text style={styles.fieldText}>{profile.interests}</Text>
                        )}
                    </View>
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTitle}>Location:</Text>
                    <View style={[styles.textBox, isEditing && styles.editTextBox]}>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={profile.location}
                                onChangeText={(value) => handleInputChange('location', value)}
                            />
                        ) : (
                            <Text style={styles.fieldText}>{profile.location}</Text>
                        )}
                    </View>
                </View>
            </View>
            <Footer navigation={navigation} activeTab="Profile" />
        </View>
    );
};

export default Profile;