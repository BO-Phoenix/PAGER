import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Upcoming = () => {
  return (
    <View style={styles.container}>
      <Text>I Am Upcoming</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default Upcoming;