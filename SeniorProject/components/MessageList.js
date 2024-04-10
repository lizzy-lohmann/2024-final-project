import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import MessageItem from './MessageItem';
import { useAuth } from './useAuth'; // Path to your auth hook or context

const MessageList = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const { user } = useAuth(); // Your auth context or hook to get the current user

  useEffect(() => {
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        isCurrentUser: doc.data().senderId === user.uid // Compare with current user ID
      }));
      setMessages(msgs);
    });

    return unsubscribe; // Cleanup on unmount
  }, [chatId]);

  return (
      <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
              <MessageItem message={item} isCurrentUser={item.isCurrentUser} />
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
