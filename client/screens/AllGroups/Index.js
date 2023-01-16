import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import globalStyles from '../../globalStyles';
import Upcoming from './Upcoming.js';
import Attended from './Attended.js';
import Create from './Create.js';

const Index = () => {

  const Stack = createNativeStackNavigator();

  // const Tab = createBottomTabNavigator();

  return (
    // <View style={globalStyles.container}>
    //   <Text style={globalStyles.text}>_______ Screen</Text>
    // </View>

      <Stack.Navigator initialRouteName="Attended">
        <Stack.Screen
          name="Upcoming"
          component={Upcoming}
          // options={{title: 'PAGER'}}
        />
        <Stack.Screen
          name="Attended"
          component={Attended}
          // options={{title: 'PAGER'}}
        />
        <Stack.Screen
          name="Create"
          component={Create}
          // options={{title: 'PAGER'}}
        />
      </Stack.Navigator>

      // <Tab.Navigator
      //   initialRouteName="Upcoming"
      // >
      //   <Tab.Screen
      //     name="Upcoming"
      //     component={Upcoming}
      //   />
      //   <Tab.Screen
      //     name="Attended"
      //     component={Attended}
      //   />
      //   <Tab.Screen
      //     name="Create"
      //     component={Create}
      //   />
      // </Tab.Navigator>

  )
};

export default Index;

const styles = StyleSheet.create({});
