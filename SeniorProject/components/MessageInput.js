import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import {collection, addDoc, serverTimestamp, getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";

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

const MessageInput = ({ chatId, db, userId }) => {
  const [text, setText] = useState('');

  const handleSend = async () => {
    if (text) {
      await addDoc(collection(db, 'chats', chatId, 'messages'), {
        content: text,
        sender: userId,
        timestamp: serverTimestamp() // This will set the timestamp when the message is added to the database
      });
      setText('');
    }
  };

  return (
      <View style={styles.container}>
        <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Type a message..."
        />
        <Button title="Send" onPress={handleSend} />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 2,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f7f7f7',
    borderRadius: 20,
  },
});

export default MessageInput;
