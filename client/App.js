import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Login/Index.js';
import HomePage from './screens/HomePage/Index.js';
import AllGoups from './screens/AllGroups/Index.js';
import IndividualGroups from './screens/IndividualGroups/Index.js';
import {
  getAllEvents,
  getOneEvent,
  addGroupToEvent,
  removeGroupFromEvent,
} from './db/event';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export default function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getAllEvents();
      setEvents(response);
    }
    // addGroupToEvent('2lIbJPzhpMTowLdZLsY7', 'this is an another new group id ');
    // getOneEvent('2lIbJPzhpMTowLdZLsY7');
    // removeGroupFromEvent('2lIbJPzhpMTowLdZLsY7', 'rt7rtkrt732jfi45jf344');
    fetchData();
  }, []);

  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen
    //       options={{ headerShown: false }}
    //       name="Login"
    //       component={LoginScreen}
    //     />
    //     <Stack.Screen
    //       options={{ headerShown: false }}
    //       name="HomePage"
    //       component={HomePage}
    //     />
    //     <Stack.Screen
    //       options={{ headerShown: false }}
    //       name="AllGoups"
    //       component={AllGoups}
    //     />
    //     <Stack.Screen
    //       options={{ headerShown: false }}
    //       name="IndividualGroups"
    //       component={IndividualGroups}
    //     />

    //   </Stack.Navigator>
    // </NavigationContainer>
    <View style={{ position: 'absolute', top: 50, left: 50 }}>
      <FlatList
        data={events}
        keyExtractor={(events) => events.event_name}
        renderItem={({ item }) => <Text>{item.event_name}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
