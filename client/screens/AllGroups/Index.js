import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import globalStyles from '../../globalStyles';
import Upcoming from './Upcoming.js';
import Attended from './Attended.js';
import Create from './Create.js';

const Index = () => {

  const Stack = createNativeStackNavigator();

  const Tab = createMaterialTopTabNavigator();

  return (
    // <View style={globalStyles.container}>
    //   <Text style={globalStyles.text}>_______ Screen</Text>
    // </View>

      // <Stack.Navigator initialRouteName="Attended">
      //   <Stack.Screen
      //     name="Upcoming"
      //     component={Upcoming}
      //     // options={{title: 'PAGER'}}
      //   />
      //   <Stack.Screen
      //     name="Attended"
      //     component={Attended}
      //     // options={{title: 'PAGER'}}
      //   />
      //   <Stack.Screen
      //     name="Create"
      //     component={Create}
      //     // options={{title: 'PAGER'}}
      //   />
      // </Stack.Navigator>

      <Tab.Navigator
        initialRouteName="Upcoming"
        // screenOptions={({ route }) => ({
        //   tabBarLabelStyle: { fontSize: 12 },
        //   tabBarIndicatorStyle: { backgroundColor: route.name === 'Upcoming' ? '#B5179E' : route.name === 'Attended' ?'#7209B7' : route.name === 'Create' && '#4895EF' },
        //   })}
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
        }}
        // screenOptions={{
        //   tabBarLabelStyle: { fontSize: 12 },
        //   tabBarIndicatorStyle: { backgroundColor: '#7209B7' },
        // }}
      >
        <Tab.Screen
          name="Upcoming"
          component={Upcoming}
          options={{
            tabBarIndicatorStyle: { backgroundColor: '#B5179E' },
          }}
        />
        <Tab.Screen
          name="Attended"
          component={Attended}
          options={{
              tabBarIndicatorStyle: { backgroundColor: '#7209B7' },
          }}
        />
        <Tab.Screen
          name="Create"
          component={Create}
          options={{
              tabBarIndicatorStyle: { backgroundColor: '#4895EF' },
          }}
        />
      </Tab.Navigator>

  )
};

export default Index;

const styles = StyleSheet.create({});
