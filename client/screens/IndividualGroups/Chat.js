import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import { useSelector } from 'react-redux';
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from 'firebase/firestore';
import { signOut, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getChatMsgsPerGroup } from '../../db/group';
import { db } from '../../firebase-config.js';
import globalStyles from '../../globalStyles';

const Stack = createStackNavigator();
const authChat = getAuth();

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
  const { userId } = useSelector((state) => state.pagerData); // user_id global state
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    // const collectionRef = collection(db, 'chat');
    // const q = query(collectionRef, orderBy('created_on', 'desc'));

    // const unsubscribe = onSnapshot(q, (snapshot) => {
    //   console.log('snapshot');
    //   setMessages(
    //     snapshot.docs.map((doc) => ({
    //       _id: doc.id,
    //       created_on: doc.data(),
    //       message_body: doc.data().message_body,
    //       sender_name: doc.data().sender_name,
    //       group_id: doc.data().group_id,
    //     })),
    //   );
    // });
    // return unsubscribe;

    const groupMessages = getChatMsgsPerGroup('IrIfBilvP6HSrCHzty9d');
    console.log('these are group messages:', groupMessages);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );

    const { _id, created_on, message_body, sender_name, group_id } =
      messages[0];
    addDoc(collection(db, 'chat'), {
      _id,
      created_on,
      message_body,
      sender_name,
      group_id,
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: authChat?.currentUser?.email,
      }}
    />
  );
};

export default Chat;
