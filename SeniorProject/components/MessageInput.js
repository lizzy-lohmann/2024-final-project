import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import { doc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { db } from '../firebaseConfig.js';

const MessageInput = ({ chatId, userId }) => {
  const [text, setText] = useState('');

  const handleSend = async () => {
    if (text.trim()) {
      const chatDocRef = doc(db, 'chats', chatId);
      try {
        await updateDoc(chatDocRef, {
          messages: arrayUnion({
            content: text.trim(),
            sender: userId,
            time: serverTimestamp()
          })
        });
        setText('');
      } catch (error) {
        console.error("Error sending message: ", error);
      }
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