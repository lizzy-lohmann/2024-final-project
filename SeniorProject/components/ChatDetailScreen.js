import React from 'react';
import { View } from 'react-native';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useAuth } from '../useAuth';

const ChatDetailScreen = ({ route }) => {
    const { chatId } = route.params;
    const { user } = useAuth(); // Ensure useAuth provides the current user

    return (
        <View style={{ flex: 1 }}>
            <MessageList chatId={chatId} />
            {/* Pass the current user's uid to MessageInput */}
            <MessageInput chatId={chatId} userId={user.uid} />
        </View>
    );
};

export default ChatDetailScreen;