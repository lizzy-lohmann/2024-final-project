import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import MessageItem from './MessageItem';

const messages = [
  // Dummy data for now
  { id: '1', text: 'Hello!', timestamp: new Date(), sender: 'User1' },
  // Add more messages here
];

const MessageList = () => {
  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <MessageItem message={item} />}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MessageList;
