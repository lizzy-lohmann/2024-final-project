// ChatDetailScreen.js or the equivalent component that shows the chat messages
import React from 'react';
import { View } from 'react-native';
import MessageList from './MessageList'; // Path to your MessageList component
import MessageInput from './MessageInput'; // Path to your MessageInput component
import { useAuth } from './useAuth';
import { db } from './firebaseConfig';

const ChatDetailScreen = ({ route }) => {
    const { chatId } = route.params;
    const { user } = useAuth(); // Your auth context or hook to get the current user

    const handleSend = async (text) => {
        // Function to send a message to the Firestore database
        const messagesRef = collection(db, 'chats', chatId, 'messages');
        await addDoc(messagesRef, {
            content: text,
            senderId: user.uid, // Replace with actual current user ID property
            timestamp: serverTimestamp()
        });
    };

    return (
        <View style={{ flex: 1 }}>
            <MessageList chatId={chatId} db={db} userId={user.uid} />
            <MessageInput onSend={handleSend} />
        </View>
    );
};

export default ChatDetailScreen;
