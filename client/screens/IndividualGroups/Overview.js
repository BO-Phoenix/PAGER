import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import globalStyles from '../../globalStyles';

const Overview = ({ navigation }) => {
  // I am most likely going to have to pick another navigation method in order to make this look like the wireframe we have drawn on figma
  return (
    <View style={styles.container}>
      <Text>Overview </Text>
      <TouchableOpacity
        title="Schedule"
        onPress={() => navigation.navigate('Schedule', { name: 'Schedule' })}
      >
        <Text>Schedule</Text>
      </TouchableOpacity>

      <TouchableOpacity
        title="Chat"
        onPress={() => navigation.navigate('Chat', { name: 'Chat' })}
      >
        <Text>Chat</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
};

export default Overview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
