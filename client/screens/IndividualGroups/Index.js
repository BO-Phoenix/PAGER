import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import globalStyles from '../../globalStyles';
import { Overview, Schedule, AddSchedule, Chat } from './individualgroups';

const Index = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Attended">
      <Stack.Screen name="Overview" component={Overview} />
      <Stack.Screen name="Schedule" component={Schedule} />
      <Stack.Screen name="AddSchedule" component={AddSchedule} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

export default Index;

const styles = StyleSheet.create({});
