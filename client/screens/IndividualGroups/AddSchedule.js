import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import globalStyles from '../../globalStyles';

const AddSchedule = () => {
  // const { width, height } = Dimensions.get('window');
  // console.log('width: ', width, 'height: ', height);
  return (
    <View style={styles.container}>
      <Text style={globalStyles.text}>Individual group screen</Text>
    </View>
  );
};

export default AddSchedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
