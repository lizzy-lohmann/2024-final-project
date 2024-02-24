import React, { useState } from 'react';
import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import styles from './styles';
import Footer from "./Footer";

const Profile = ({ navigation }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("John Doe");
    const [pronouns, setPronouns] = useState("He/Him");
    const [birthday, setBirthday] = useState("January 1, 1990");
    const [profession, setProfession] = useState("Software Engineer");
    const [interests, setInterests] = useState("Coding, Reading, Hiking");
    const [aboutMe, setAboutMe] = useState("I am a software developer passionate about building cool apps!");
    const [location, setLocation] = useState("New York, NY");

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


                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        <Image
                            style={styles.avatar}
                            source={{/*     image source */}}
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
                                value={name}
                                onChangeText={setName}
                            />
                        ) : (
                            <Text style={styles.fieldText}>{name}</Text>
                        )}
                    </View>
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTitle}>Pronouns:</Text>
                    <View style={[styles.textBox, isEditing && styles.editTextBox]}>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={pronouns}
                                onChangeText={setPronouns}
                            />
                        ) : (
                            <Text style={styles.fieldText}>{pronouns}</Text>
                        )}
                    </View>
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTitle}>Birthday:</Text>
                    <View style={[styles.textBox, isEditing && styles.editTextBox]}>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={birthday}
                                onChangeText={setBirthday}
                            />
                        ) : (
                            <Text style={styles.fieldText}>{birthday}</Text>
                        )}
                    </View>
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTitle}>Profession:</Text>
                    <View style={[styles.textBox, isEditing && styles.editTextBox]}>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={profession}
                                onChangeText={setProfession}
                            />
                        ) : (
                            <Text style={styles.fieldText}>{profession}</Text>
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
                                value={aboutMe}
                                onChangeText={setAboutMe}
                            />
                        ) : (
                            <Text style={styles.fieldText}>{aboutMe}</Text>
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
                                value={interests}
                                onChangeText={setInterests}
                            />
                        ) : (
                            <Text style={styles.fieldText}>{interests}</Text>
                        )}
                    </View>
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTitle}>Location:</Text>
                    <View style={[styles.textBox, isEditing && styles.editTextBox]}>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={location}
                                onChangeText={setLocation}
                            />
                        ) : (
                            <Text style={styles.fieldText}>{location}</Text>
                        )}
                    </View>
                </View>

            </View>

            {/* Custom Footer */}
            <Footer navigation={navigation} />
        </View>
    );
};

export default Profile;