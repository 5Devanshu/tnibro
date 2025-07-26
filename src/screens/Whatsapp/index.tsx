import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const WhatsappScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to the Whatsapp Screen</Text>
      <Text style={styles.text}>This is your home screen content.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default WhatsappScreen;
