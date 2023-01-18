import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import SelectEvent from '../HomePage/Index.js';
import GroupPage from '../HomePage/Expanded.js';
import SchedulePage from '../HomePage/Schedule.js';
import MemberPage from '../HomePage/Members.js';
import SwipeCardPage from '../HomePage/SwipeCard.js';

const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 45, height: 35 }}
      // source={require('')}
    />
  );
}

const HomepageNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen
      name="SelectEvents"
      component={SelectEvent}
      options={{
        // headerTitle: (props) => <LogoTitle {...props} />,
        title: 'SelectEvents',
      }}
    />
    <Stack.Screen
      name="SwipeCard"
      component={SwipeCardPage}
      options={{
        title: 'SwipeCard',
        // headerShown: false,
      }}
      // options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Group"
      component={GroupPage}
      options={{
        title: 'Group',
        // headerShown: false,
      }}
      // options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Schedule"
      component={SchedulePage}
      options={{
        title: 'Schedule',
        // headerShown: false,
      }}
      // options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Member"
      component={MemberPage}
      options={{
        title: 'Member',
        // headerShown: false,
      }}
      // options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default HomepageNavigator;
