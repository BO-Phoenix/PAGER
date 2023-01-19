/* eslint-disable global-require */
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  CheckBox,
} from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-ionicons';
import Loading from '../Loading/Index.js';
import HomePage from '../HomePage/Index.js';
import AllGroups from '../AllGroups/Index.js';
import Profile from '../Profile/Index.js';
import globalStyles from '../../globalStyles';
import emptyBox from '../../assets/box.png';
import HomepageNavigator from './HomepageNavigator.js';
import ProfileNavigator from './ProfileNavigator.js';

const Tab = createBottomTabNavigator();

const NavTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'black',
  },
};

const styles = StyleSheet.create({
  container: {
    overflow: 'scroll',
    backgroundColor: 'black',
    padding: 10,
  },
});

const Navigation = () => {
  const [fontLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    Bebas: require('../../assets/fonts/BebasNeue-Regular.ttf'),
  });

  if (!fontLoaded) {
    return <Loading />;
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 70,
          padding: 10,
          backgroundColor: 'black',
        },
        tabBarActiveTintColor: '#F72585',
        tabBarInactiveTintColor: 'white',
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="PROFILE" component={ProfileNavigator} />
      <Tab.Screen name="HOME" component={HomepageNavigator} />
      <Tab.Screen name="GROUPS" component={AllGroups} />
    </Tab.Navigator>
  );
};

export default Navigation;
