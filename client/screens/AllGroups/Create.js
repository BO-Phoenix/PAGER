import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Create = () => {
  return (
    <View style={styles.container}>
      <Text>I Am Create</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default Create;