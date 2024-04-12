import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import {collection, addDoc, serverTimestamp} from "firebase/firestore";
import { db } from '../firebaseConfig.js';

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
