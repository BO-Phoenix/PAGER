// import { useSelector, useDispatch } from 'react-redux';
// // import { } from './reducers'; // state from reducer(updates state) file
// import { getAllEvents, getUserGroups } from './actions'; // actions(tells reducer what to do with the state) that are being dispatched
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Login/Index.js';
import HomePage from './screens/HomePage/Index.js';
import AllGroups from './screens/AllGroups/Index.js';
import IndividualGroups from './screens/IndividualGroups/Index.js';
import { getEvents } from './db/event';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export default function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getEvents();
      setEvents(response);
    }
    fetchData();
  }, []);

  return (
    <NavigationContainer>
      <View id="header-container" style={styles.headerContainer}>
        <Text id="app-header" style={styles.appHeader}>
          PAGER
        </Text>
      </View>
      <Stack.Navigator initialRouteName="AllGroups">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="HomePage"
          component={HomePage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AllGroups"
          component={AllGroups}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="IndividualGroups"
          component={IndividualGroups}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  appHeader: {
    fontFamily: 'Arial',
    fontWeight: 'Semi Bold',
    fontSize: 28,
    color: 'white',
    backgroundColor: 'black',
    margin: 12,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
