import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import globalStyles from '../../globalStyles';

const Index = () => {
  // const { width, height } = Dimensions.get('window');
  // console.log('width: ', width, 'height: ', height);
  return (
    <>
      <View style={globalStyles.container}>
        <Text style={globalStyles.text}>Individual group screen</Text>
      </View>
    </>
  );
};

export default Index;

const styles = StyleSheet.create({});
