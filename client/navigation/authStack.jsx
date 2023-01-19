import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import Welcome from '../screens/Login/Welcome.jsx';
import SignInScreen from '../screens/Login/Index.js';
import SignOutScreen from '../screens/Login/SignUpScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {

  const [fontLoaded] = useFonts({
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    Bebas: require('../assets/fonts/BebasNeue-Regular.ttf'),
  });

  return (
    <NavigationContainer>
      <SafeAreaView id="header-container" style={styles.headerContainer}>
        <Text id="app-header" style={styles.appHeader}>
          PAGER
        </Text>
      </SafeAreaView>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} />
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="Sign Up" component={SignOutScreen} />
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
    fontFamily: 'Bebas',
    fontSize: 40,
    color: 'white',
    margin: 10,
  },
});
