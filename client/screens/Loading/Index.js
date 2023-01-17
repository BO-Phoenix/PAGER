import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import globalStyles from '../../globalStyles';

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});

const Index = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={globalStyles.text}>Loading</Text>
    </View>
  );
};

export default Index;
