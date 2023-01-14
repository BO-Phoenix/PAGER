import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Login/Index.js';
import HomePage from './screens/HomePage/Index.js';
import AllGoups from './screens/AllGroups/Index.js';
import IndividualGroups from './screens/IndividualGroups/Index.js';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="HomePage" component={HomePage} />
        <Stack.Screen options={{ headerShown: false }} name="AllGoups" component={AllGoups} />
        <Stack.Screen options={{ headerShown: false }} name="IndividualGroups" component={IndividualGroups} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
