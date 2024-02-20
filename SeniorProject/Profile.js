import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import styles from './styles'; // Assuming your style.js file is named 'style.js'
import Footer from "./Footer";

const Profile = ({ navigation }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("John Doe");
    const [interests, setInterests] = useState("Coding, Reading, Hiking");
    const [aboutMe, setAboutMe] = useState("I am a software developer passionate about building cool apps!");

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const saveChanges = () => {
        // Code to save changes to MongoDB database goes here
        setIsEditing(false);
    };


    return (
        <View style={styles.container}>
            {/* Custom Header */}
            <View style={styles.header}>
                {/* Header content */}
                <TouchableOpacity onPress={handleEdit} style={styles.headerButton}>
                    <Text style={styles.headerButtonText}>{isEditing ? "Save" : "Edit"}</Text>
                </TouchableOpacity>
            </View>

            {/* Screen Content */}
            <View style={styles.content}>
                {/* Name Box */}
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

                {/* About Me */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldTitle}>About Me:</Text>
                    <View style={[styles.textBox, isEditing && styles.editTextBox]}>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={aboutMe}
                                onChangeText={setName}
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
                                onChangeText={setName}
                            />
                        ) : (
                            <Text style={styles.fieldText}>{interests}</Text>
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