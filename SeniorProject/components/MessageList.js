import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { doc, onSnapshot } from "firebase/firestore"; // Ensure doc is imported
import MessageItem from './MessageItem';
import { useAuth } from '../useAuth';
import { db } from '../firebaseConfig.js';

const MessageList = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const { user } = useAuth(); // Make sure useAuth is correctly providing the user object

  useEffect(() => {
    const chatDocRef = doc(db, 'chats', chatId);

    const unsubscribe = onSnapshot(chatDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const chatData = docSnapshot.data();
        // Assuming 'messages' is an array of message objects in the chat document
        const msgs = chatData.messages.map((msg, index) => ({
          ...msg,
          id: index.toString(), // Since there's no unique ID, use the array index as a key
          isCurrentUser: user && msg.sender === user.uid, // Make sure to check user is not null
        }));
        setMessages(msgs);
      } else {
        console.log('No such chat document!');
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [chatId, user]); // Add user to dependency array

  return (
      <FlatList
          data={messages}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => (
              <MessageItem
                  message={item}
                  isCurrentUser={item.isCurrentUser}
              />
          )}
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
