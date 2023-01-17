import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, Button, TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Attended = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>I Am Attended</Text>
      <TouchableOpacity
        title="Upcoming"
        onPress={() => navigation.navigate('Upcoming', { name: 'Upcoming' })}
      >
        <Text>Upcoming</Text>
      </TouchableOpacity>

      <TouchableOpacity
        title="Create"
        onPress={() => navigation.navigate('Create', { name: 'Create' })}
      >
        <Text>Create</Text>
      </TouchableOpacity>

      {/* <Button
      title="Upcoming"
      onPress={() =>
        navigation.navigate('Upcoming', {name: 'Upcoming'})
      } /> */}
      <StatusBar style="auto" />
    </View>
  );
};

export default Attended;
