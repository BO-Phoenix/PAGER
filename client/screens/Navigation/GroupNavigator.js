import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
// -- maddie's page
import AllGroupsIndex from '../AllGroups/Index.js';
// -- jeff's page
import IndividualGroupsIndex from '../IndividualGroups/Index.js';


const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 45, height: 35 }}
      // source={require('')}
    />
  );
}

const GroupNavigator = () => (
  <Stack.Navigator mode="modal">
    <Stack.Screen
      name="AllGroupsIndex"
      component={AllGroupsIndex}
      options={{
        // headerTitle: (props) => <LogoTitle {...props} />,
        // title: 'Upcoming',
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="IndividualGroupsIndex"
      component={IndividualGroupsIndex}
      options={{
        // title: 'Overview',
        headerShown: false,
        // headerShown: false,
      }}
      // options={{ headerShown: false }}
    />

  </Stack.Navigator>
);

export default GroupNavigator;
