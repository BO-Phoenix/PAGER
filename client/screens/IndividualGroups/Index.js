/* eslint-disable react/no-children-prop */
/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import globalStyles from '../../globalStyles';
import { Overview, Schedule, Chat, Members } from './individualgroups';
// --added by maddie
import Loading from '../Loading/Index.js';

const Index = ({ route }) => {
  const groupData = route.params;
  const Stack = createNativeStackNavigator();
  const Tab = createMaterialTopTabNavigator();

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
      initialRouteName="Overview"
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, fontFamily: 'Poppins' },
      }}
    >
      <Tab.Screen
        name="Overview"
        // component={Overview}
        options={{
          tabBarIndicatorStyle: { backgroundColor: '#B5179E' },
        }}
        children={() => <Overview groupData={groupData} />}
      />
      <Tab.Screen
        name="Schedule"
        // component={Schedule}
        options={{
          tabBarIndicatorStyle: { backgroundColor: '#7209B7' },
        }}
        children={() => <Schedule groupData={groupData} />}
      />
      <Tab.Screen
        name="Chat"
        // component={Chat}
        options={{
          tabBarIndicatorStyle: { backgroundColor: '#4895EF' },
        }}
        children={() => <Chat groupData={groupData} />}
      />
    </Tab.Navigator>
  );
};

export default Index;

const styles = StyleSheet.create({});
