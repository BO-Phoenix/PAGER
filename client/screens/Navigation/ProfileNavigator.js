import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Index from '../Profile/Index';
import ExpandedFriends from '../Profile/ExpandedFriends';
import ExpandedTastes from '../Profile/ExpandedTastes';
import EditProfile from '../Profile/EditProfile';

const Stack = createStackNavigator();

const HomepageNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen
      name="Index"
      component={Index}
      options={{
        title: 'Index',
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ExpandedFriends"
      component={ExpandedFriends}
      options={{
        title: 'All Friends',
      }}
    />
    <Stack.Screen
      name="ExpandedTastes"
      component={ExpandedTastes}
      options={{
        title: 'Music Tastes',
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{
        title: 'Edit Profile',
      }}
    />
  </Stack.Navigator>
);

export default HomepageNavigator;
