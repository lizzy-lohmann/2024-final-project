import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessageItem = ({ message }) => {
  return (
    <View style={styles.messageBubble}>
      <Text>{message.text}</Text>
      <Text style={styles.timestamp}>{new Date(message.timestamp).toLocaleString()}</Text>
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
