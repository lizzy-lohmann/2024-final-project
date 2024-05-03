import React, {useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity, Image, Text, TextInput} from 'react-native';
import styles from './styles';
import Footer from "./Footer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import { db } from './firebaseConfig.js';


const Message = ({ navigation }) => {
    // This state will eventually be populated with data from your database
    const [searchQuery, setSearchQuery] = useState('');
    const [chats, setChats] = useState([]);


    // Function to handle when a chat item is pressed
    const handlePressChatItem = (chat) => {
        navigation.navigate('ChatDetailScreen', { chatId: chat.userId, userName: chat.userName });
    };
    const handleSearch = () => {
        // Implement your search functionality                                            JUSTIN/CHASE
        console.log('Searching for:', searchQuery);
    };

    // Fetch chats for a user from Firestore
    useEffect(() => {
        const fetchChats = async () => {
            try {
                // Retrieve userID from AsyncStorage
                const userId = await AsyncStorage.getItem('userID');
                if (userId) {
                    // Initialize Firestore and query chats collection
                    const chatsQuery = query(collection(db, 'chats'), where('participants', 'array-contains', userId));
                    const querySnapshot = await getDocs(chatsQuery);
                    const chat = querySnapshot.docs[0];
                    const chatID = chat.id;
                    await AsyncStorage.setItem('chatID', chatID);
                    const chatsArray = querySnapshot.docs.map(doc => {
                        const data = doc.data();
                        const lastMessage = data.messages.length > 0 ? data.messages[data.messages.length - 1] : null;
                        return {
                            chatId: doc.id,
                            participants: data.participants,
                            lastMessage: lastMessage ? lastMessage.content : '',
                            lastMessageTime: lastMessage ? lastMessage.time : '',
                        };
                    });

                    setChats(chatsArray);
                } else {
                    console.log('UserID not found in AsyncStorage');
                }
            } catch (error) {
                //console.error('Error fetching chats:', error);
            }
        };

        fetchChats();
    }, []);



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
                keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                renderItem={({ item }) => <ChatItem chat={item} onPress={() => handlePressChatItem(item)} />}
            />
            <Footer navigation={navigation} activeTab="Messaging" />
        </View>
    );
};




const ChatItem = ({ chat, onPress }) => {
    // Placeholder image require statement
    const placeholderAvatarChat = require('./assets/Lizzy.jpeg');

    return (
        <TouchableOpacity onPress={onPress} style={styles.chatItem}>
            <View style={styles.chatItemLeft}>
                {/* Use placeholder image as source */}
                <Image source={placeholderAvatarChat} style={styles.avatarChat} />
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
