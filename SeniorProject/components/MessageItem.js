import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessageItem = ({ message, isCurrentUser }) => {
  const messageStyle = isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble;

  return (
      <View style={[styles.messageBubble, messageStyle]}>
        <Text>{message.content}</Text>
        <Text style={styles.timestamp}>
          {message.timestamp?.toDate().toLocaleString() || '...'}
        </Text>
      </View>
  );
};

const styles = StyleSheet.create({
  messageBubble: {
    padding: 8,
    margin: 10,
    backgroundColor: '#e5e5ea',
    borderRadius: 15,
  },
  timestamp: {
    fontSize: 10,
    color: '#999',
    alignSelf: 'flex-end',
  },
});

export default MessageItem;
