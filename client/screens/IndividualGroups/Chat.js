/* eslint-disable react/style-prop-object */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import globalStyles from '../../globalStyles';

const Chat = ({ navigation }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity
        title="Overview"
        onPress={() => navigation.navigate('Overview', { name: 'Overview' })}
      >
        <Text>Overview </Text>
      </TouchableOpacity>

      <TouchableOpacity
        title="Schedule"
        onPress={() => navigation.navigate('Schedule', { name: 'Schedule' })}
      >
        <Text>Schedule</Text>
      </TouchableOpacity>

      <Text>Chat</Text>

      <StatusBar style="auto" />
    </View>
  );
};

export default Chat;
