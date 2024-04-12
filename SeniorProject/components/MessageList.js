import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import {collection, query, where, orderBy, onSnapshot, getFirestore, getDocs, addDoc} from "firebase/firestore";
import MessageItem from './MessageItem';
import { useAuth } from './useAuth';
import { initializeApp } from 'firebase/app';


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
const messagesDB = collection(db, 'chats');

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
