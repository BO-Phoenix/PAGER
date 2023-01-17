import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import globalStyles from '../../globalStyles';

const Index = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={StyleSheet.compose(styles.text, globalStyles.text)}>Login Screen</Text>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
  },
});
