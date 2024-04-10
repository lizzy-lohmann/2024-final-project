import React, { useState } from 'react';
import {View, FlatList, TouchableOpacity, Image, Text, TextInput} from 'react-native';
import styles from './styles';
import Footer from "./Footer";
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';


const Message = ({ navigation }) => {
    // This state will eventually be populated with data from your database
    const [searchQuery, setSearchQuery] = useState('');
    const [chats, setChats] = useState(placeholderUsersChats);


    // Function to handle when a chat item is pressed
    const handlePressChatItem = (chat) => {
        navigation.navigate('ChatDetailScreen', { chatId: chat.userId, userName: chat.userName });
    };
    const handleSearch = () => {
        // Implement your search functionality                                            JUSTIN/CHASE
        console.log('Searching for:', searchQuery);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TextInput
                    style={styles.searchInput}
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    source={require('./assets/find.png')}
                    placeholderTextColor="#000000"
                    returnKeyType="search"
                    onSubmitEditing={handleSearch}
                />
                <Image
                    style={styles.headerButton}
                    source={require('./assets/find.png')}
                />
                {/*<a href="https://www.flaticon.com/free-icons/magnifier" title="magnifier icons">Magnifier icons created by The Icon Tree - Flaticon</a>*/}
            </View>

            {/* Chat List */}
            <FlatList
                data={chats}
                keyExtractor={(item) => item.userId}
                renderItem={({ item }) => (
                    <ChatItem chat={item} onPress={() => handlePressChatItem(item)} />
                )}
            />
            <Footer navigation={navigation} activeTab="Messaging" />
        </View>
    );
};


// Placeholder data structure
const placeholderUsersChats = [
    { userId: 'user1', userName: 'Alice', lastMessage: 'Hey there!', lastMessageTime: '3:45 PM', avatarUrl: require('./assets/Anna.jpeg')},
    { userId: 'user2', userName: 'Bob', lastMessage: 'How are you?', lastMessageTime: 'Yesterday', avatarUrl: require('./assets/Gabbi.jpeg') },
    // ... more users
];

const ChatItem = ({ chat, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.chatItem}>
            <View style={styles.chatItem}>
                <Image source={chat.avatarUrl} style={styles.messageAvatar} />
            </View>
            <View style={styles.chatDetails}>
                <Text style={styles.userName}>{chat.userName}</Text>
                <Text style={styles.lastMessage}>{chat.lastMessage}</Text>
            </View>
            <Text style={styles.lastMessageTime}>{chat.lastMessageTime}</Text>
        </TouchableOpacity>
    );
};


export default Message;
