import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { React, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginScreen from '../screens/Login/Index.js';
import HomePage from '../screens/HomePage/Index.js';
import AllGroups from '../screens/AllGroups/Index.js';
import IndividualGroups from '../screens/IndividualGroups/Index.js';
import { getEvents } from '../db/event';
import globalStyles from '../globalStyles';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { Button } from 'react-native-elements';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();
const Stack = createNativeStackNavigator();

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

export default function App() {
  const { user } = useAuthentication();
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
      <Button title="Sign Out" style={globalStyles.button} onPress={() => auth.signOut()} />
    </NavigationContainer>
  );
}
