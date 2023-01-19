import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, Text, View } from 'react-native';
import globalStyles from '../../globalStyles';
import {
  Overview,
  Schedule,
  AddSchedule,
  Chat,
  Members,
} from './individualgroups';

const Index = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Overview"
      screenOptions={{ tabBarLabelStyle: { fontSize: 12 } }}
    >
      <Tab.Screen
        name="Overview"
        component={Overview}
        options={{
          tabBarIndicatorStyle: { backgroundColor: '#B5179E' },
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={Schedule}
        options={{
          tabBarIndicatorStyle: { backgroundColor: '#7209B7' },
        }}
      />
      {/* <Tab.Screen name="AddSchedule" component={AddSchedule} /> */}
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIndicatorStyle: { backgroundColor: '#4895EF' },
        }}
      />
    </Tab.Navigator>
  );
};

export default Index;

const styles = StyleSheet.create({});
