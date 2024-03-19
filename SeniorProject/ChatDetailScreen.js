// ChatDetailScreen.js

import React, { useState } from 'react';
import { View, FlatList, TextInput, Button, Text, StyleSheet } from 'react-native';
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

    return (
        <View style={{ flex: 1 }}>
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
    );
};

export default ChatDetailScreen;
