import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import styles from './styles';
import Footer from "./Footer";
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';


const Message = ({ navigation }) => {
    // This state will eventually be populated with data from your database
    const [chats, setChats] = useState(placeholderUsersChats);

    // Function to handle when a chat item is pressed
    const handlePressChatItem = (chat) => {
        navigation.navigate('ChatDetailScreen', { chatId: chat.userId, userName: chat.userName });
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
                    <ChatItem chat={item} onPress={() => handlePressChatItem(item)} />
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
            <View style={styles.avatarContainer}>
                <Image source={{ uri: chat.avatarUrl }} style={styles.avatar} />
            </View>
            <View style={styles.chatDetails}>
                <Text style={styles.userName}>{chat.userName}</Text>
                <Text style={styles.lastMessage}>{chat.lastMessage}</Text>
            </View>
            <Text style={styles.lastMessageTime}>{chat.lastMessageTime}</Text>
            {chat.unreadCount > 0 && (
                <View style={styles.notificationBubble}>
                    <Text style={styles.notificationText}>{chat.unreadCount}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};


export default Message;
