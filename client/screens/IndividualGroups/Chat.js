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
  const [groupId, setGroupId] = useState('IrIfBilvP6HSrCHzty9d');

  useLayoutEffect(() => {
    const collectionRef = collection(db, 'chat');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log('snapshot');
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
          group_id: groupId,
        })),
      );
    });
    return unsubscribe;
    // const groupMessages = getChatMsgsPerGroup('IrIfBilvP6HSrCHzty9d').then(
    //   (result) => {
    //     setMessages(result);
    //   },
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );

    const { _id, createdAt, text, user, group_id } = messages[0];
    addDoc(collection(db, 'chat'), {
      _id,
      createdAt,
      text,
      user,
      group_id,
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        id: authChat?.currentUser?.email,
        avatar:
          'https://firebasestorage.googleapis.com/v0/b/project-pager-ac1f6.appspot.com/o/images%2Fphoenix-nest.png8919b168-f674-477d-afb3-adc85c9d573b?alt=media&token=8a5c635e-5ce6-45c3-b018-3eb9d40b1f83',
      }}
    />
  );
};

export default Chat;
