import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import globalStyles from '../../globalStyles';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const GChat = () => {
  return <GiftedChat />;
};

const ChatStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chat" component={GChat} />
    </Stack.Navigator>
  );
};

const Chat = ({ navigation }) => {
  return <ChatStack />;
};

export default Chat;

{
  /* <View style={styles.container}>
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
    </View> */
}
