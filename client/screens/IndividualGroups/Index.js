import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import globalStyles from '../../globalStyles';

const Index = () => {
  // const { width, height } = Dimensions.get('window');
  // console.log('width: ', width, 'height: ', height);
  return (
    <>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerText}> PAGER </Text>
      </View>
      <View style={globalStyles.container}>
        <Text style={globalStyles.text}>Individual group screen</Text>
      </View>
      <View style={globalStyles.footer}>
        <Text style={globalStyles.footerText}> FOOTER BAR </Text>
      </View>
    </>
  );
};

export default Index;

const styles = StyleSheet.create({});
