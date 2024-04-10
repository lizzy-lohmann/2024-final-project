import React, {useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity, Image, Text, TextInput} from 'react-native';
import styles from './styles';
import Footer from "./Footer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';


const firebaseConfig = {
    apiKey: "AIzaSyCX2PhLpEJX_n39XVit_bjCz-XFiQaIn-Y",
    authDomain: "seniordesign-ae10f.firebaseapp.com",
    projectId: "seniordesign-ae10f",
    storageBucket: "seniordesign-ae10f.appspot.com",
    messagingSenderId: "230961872715",
    appId: "1:230961872715:web:6e830a80f457c42770b2ce",
    measurementId: "G-H4KWB4XWGK",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colRef = collection(db, 'users');

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
            const userId = '3JksnyQ4CNs3uFzKpy0Y'; // Replace with the current user's ID
            const chatsQuery = query(collection(db, 'chats'), where('participants', 'array-contains', userId));
            const querySnapshot = await getDocs(chatsQuery);

            const chatsArray = querySnapshot.docs.map(doc => {
                // Assuming each chat document's structure matches the one from your screenshot
                const data = doc.data();
                const lastMessage = data.messages.length > 0 ? data.messages[data.messages.length - 1] : null;
                return {
                    chatId: doc.id,
                    participants: data.participants,
                    lastMessage: lastMessage ? lastMessage.content : '',
                    lastMessageTime: lastMessage ? lastMessage.time : '',
                    // You would also need to resolve user details like username and avatar for each participant here
                };
            });

            setChats(chatsArray);
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
