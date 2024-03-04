import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import styles from './styles';
import Footer from "./Footer";
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';

const Message = ({ navigation }) => {
    // This state will eventually be populated with data from your database
    const [chats, setChats] = useState(placeholderUsersChats);

    // Function to handle when a chat item is pressed
    const handlePressChatItem = (userId) => {
        // Here you would navigate to a detailed chat screen with this user
        // navigation.navigate('ChatDetailScreen', { userId });
    };

    return (
        <View style={styles.container}>
            {/* Custom Header */}
            <View style={styles.header}>
                {/* Other header content */}
            </View>

            {/* Chat List */}
            <FlatList
                data={chats}
                keyExtractor={(item) => item.userId}
                renderItem={({ item }) => (
                    <ChatItem chat={item} onPress={() => handlePressChatItem(item.userId)} />
                )}
            />

            {/* Custom Footer */}
            <Footer navigation={navigation} />
        </View>
    );
};

// Placeholder data structure
const placeholderUsersChats = [
    { userId: 'user1', userName: 'Alice', lastMessage: 'Hey there!', lastMessageTime: '3:45 PM' },
    { userId: 'user2', userName: 'Bob', lastMessage: 'How are you?', lastMessageTime: 'Yesterday' },
    // ... more users
];

const ChatItem = ({ chat, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.chatItem}>
            <Text style={styles.userName}>{chat.userName}</Text>
            <Text style={styles.lastMessage}>{chat.lastMessage}</Text>
            <Text style={styles.lastMessageTime}>{chat.lastMessageTime}</Text>
        </TouchableOpacity>
    );
};


export default Message;
