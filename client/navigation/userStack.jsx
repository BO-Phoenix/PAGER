/* eslint-disable global-require */
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { React, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button } from 'react-native-elements';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useFonts } from 'expo-font';
import Loading from '../screens/Loading/Index.js';
import LoginScreen from '../screens/Login/Index.js';
import Profile from '../screens/Profile/Index.js';
import HomePage from '../screens/HomePage/Index.js';
import AllGroups from '../screens/AllGroups/Index.js';
import IndividualGroups from '../screens/IndividualGroups/Index.js';
import { getAllEvents } from '../db/event';
import globalStyles from '../globalStyles';
import { useAuthentication } from '../utils/hooks/useAuthentication';

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
    fontFamily: 'Bebas',
    fontSize: 40,
    color: 'white',
    margin: 10,
  },
  navContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'black',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    margin: 5,
  },
  navText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'white',
    backgroundColor: 'black',
  },
  navIcon: {
    fontFamily: 'Poppins',
    fontSize: 25,
    color: 'white',
    backgroundColor: 'black',
  },
});

export default function App() {
  const { user } = useAuthentication();

  const [fontLoaded] = useFonts({
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    Bebas: require('../assets/fonts/BebasNeue-Regular.ttf'),
  });

  if (!fontLoaded) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <SafeAreaView id="header-container" style={styles.headerContainer}>
        <Text id="app-header" style={styles.appHeader}>
          PAGER
        </Text>
      </SafeAreaView>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Profile"
          component={Profile}
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
      <Button
        title="Sign Out"
        style={globalStyles.button}
        onPress={() => auth.signOut()}
      />
      <SafeAreaView id="header-container" style={styles.navContainer}>
        <View style={styles.navItem}>
          <Text id="app-header" style={styles.navIcon}>
            ICON
          </Text>
          <Text id="app-header" style={styles.navText}>
            PROFILE
          </Text>
        </View>
        <View style={styles.navItem}>
          <Text id="app-header" style={styles.navIcon}>
            ICON
          </Text>
          <Text id="app-header" style={styles.navText}>
            HOME
          </Text>
        </View>
        <View style={styles.navItem}>
          <Text id="app-header" style={styles.navIcon}>
            ICON
          </Text>
          <Text id="app-header" style={styles.navText}>
            GROUPS
          </Text>
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
}
