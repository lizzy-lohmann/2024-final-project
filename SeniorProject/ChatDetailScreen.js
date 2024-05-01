// ChatDetailScreen.js

import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, Button, Text, Image, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import styles from './styles';
import {collection, query, where, getDocs, doc, getDoc, updateDoc, arrayUnion} from 'firebase/firestore';
import { db } from './firebaseConfig';
import AsyncStorage from "@react-native-async-storage/async-storage";


const ChatDetailScreen = ({ route, navigation }) => {
    //const { chatId, userName } = route.params;
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const userName = await AsyncStorage.getItem('username');
                const chatId = await AsyncStorage.getItem('chatID');

                if (!chatId) {
                    console.error('Chat ID not found.')
                    return;
                }
                const docRef = doc(db, 'chats', chatId); // Reference to the specific chat document
                const docSnapshot = await getDoc(docRef); // Retrieve the chat document
                if (docSnapshot.exists()) {
                    const newMessages = []; // Accumulate messages in this array
                    for (let i = 0; i < docSnapshot.data().messages.length; i++) {
                        const messagesData = docSnapshot.data().messages[i].content; // Access the messages array from the document data
                        let newMessage;
                        if (docSnapshot.data().messages[i].sender === await AsyncStorage.getItem('userID')) {
                            newMessage = {
                                text: messagesData,
                                sender: 'You'
                            };
                        } else {
                            newMessage = {
                                text: messagesData,
                                sender: 'Them'
                            };
                        }
                        newMessages.push(newMessage); // Push each new message to the array
                    }
                    setMessages(newMessages); // Update state once with all messages
                } else {
                    console.error('Chat document does not exist.');
                }

            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, []);

    const sendMessage = async () => {
        if (inputText.trim()) {
            try {
                const chatId = await AsyncStorage.getItem('chatID');
                if (!chatId) {
                    console.error('Chat ID not found.');
                    return;
                }
                const docRef = doc(db, 'chats', chatId); // Reference to the specific chat document

                // Create a new message object
                const firestoreMessage = {
                    content: inputText,
                    time: new Date().toLocaleTimeString(),
                    sender: await AsyncStorage.getItem('userID')
                };
                const newMessage = {
                    text: inputText,
                    sender: 'You'
                };

                // Update the document in Firestore by appending the new message to the 'messages' array
                await updateDoc(docRef, {
                    messages: arrayUnion(firestoreMessage)
                });

                // Update the local state with the new message
                setMessages([...messages, newMessage]);

                // Clear the input field
                setInputText('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };


    const confirmBlock = () => {
        Alert.alert(
            'Block User',
            'Are you sure you want to block this user?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => blockProfile()// Here you would call the function to delete the profile
                },
            ],
            { cancelable: false }
        );
    };
    const blockProfile = () => {
        //add code to delete profile than go back to login screen
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <View style={{ flex: 1 }}>
                <View style={styles.headerProfile}>
                    <Text style={styles.headerTitle}>{}</Text>
                    <TouchableOpacity onPress={confirmBlock}>
                        <Image
                            style={styles.headerButtonImageTwo} // Make sure to define this style
                            source={require('./assets/block-user.png')} // Path to your block user icon
                        />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={messages}
                    keyExtractor={(item, index) => index.toString()} // Assuming messages don't have unique IDs
                    renderItem={({ item }) => (
                        <View style={item.sender === 'You' ? styles.myMessage : styles.theirMessage}>
                            <Text style={item.sender === 'Them' ? styles.messageText : styles.theirMessageText}>
                                {item.text}
                            </Text>
                        </View>
                    )}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        value={inputText}
                        onChangeText={setInputText}
                        style={styles.input}
                        placeholder="Type a message"
                    />
                    <Button title="Send" onPress={sendMessage} />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ChatDetailScreen;
