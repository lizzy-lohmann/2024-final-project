// ChatDetailScreen.js

import React, { useState } from 'react';
import {View, FlatList, TextInput, Button, Text, Image, TouchableOpacity, Alert, KeyboardAvoidingView, Platform} from 'react-native';
import styles from './styles';

const ChatDetailScreen = ({ route, navigation }) => {
    const { chatId, userName } = route.params;
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        if (inputText.trim()) {
            const newMessage = {
                id: messages.length + 1,
                text: inputText,
                timestamp: new Date().toISOString(),
                sender: 'You'
            };
            setMessages([...messages, newMessage]);
            setInputText('');
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
                <Text style={styles.headerTitle}>{userName}</Text>
                <TouchableOpacity onPress ={confirmBlock}>
                    <Image
                        style={styles.headerButtonImageTwo} // Make sure to define this style
                        source={require('./assets/block-user.png')} // Path to your edit icon
                    />
                </TouchableOpacity>
                {/* <a href="https://www.flaticon.com/free-icons/block-user" title="block user icons">Block user icons created by Bharat Icons - Flaticon</a> */}
            </View>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <View style={item.sender === 'You' ? styles.myMessage : styles.theirMessage}>
                    <Text style={item.sender === 'You' ? styles.messageText : styles.theirMessageText}>
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
