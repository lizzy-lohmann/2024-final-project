import React, { useState } from 'react';
import { View } from 'react-native';
import styles from './styles';
import Footer from "./Footer";
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';

const Message = ({ navigation }) => {
    const [messages, setMessages] = useState([]);

    const handleSend = (newMessageText) => {
        const newMessage = {
            id: messages.length + 1,
            text: newMessageText,
            timestamp: new Date().toISOString(), // This creates a string representation of the date
        };
        setMessages([...messages, newMessage]);
    };

    return (
        <View style={styles.container}>
            {/* Custom Header */}
            <View style={styles.header}>
                {/* Other header content */}
            </View>

            {/* Screen Content */}
            <MessageList messages={messages} />
            <MessageInput onSend={handleSend} />

            {/* Custom Footer */}
            <Footer navigation={navigation} />
        </View>
    );
};

export default Message;
