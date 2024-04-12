import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {initializeApp} from "firebase/app";
import {collection, getFirestore} from "firebase/firestore";

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
