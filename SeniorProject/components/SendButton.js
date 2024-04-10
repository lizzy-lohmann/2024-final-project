import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SendButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Send</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginLeft: 10,
    backgroundColor: '#007bff',
    borderRadius: 20,
  },
  text: {
    color: '#fff',
  },
});

export default SendButton;
