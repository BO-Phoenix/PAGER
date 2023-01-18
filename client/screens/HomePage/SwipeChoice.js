/* eslint-disable global-require */
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Dimensions, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import Loading from '../Loading/Index.js';
import globalStyles from '../../globalStyles';
import emptyBox from '../../assets/box.png';

const screenWidth = (Dimensions.get('window').width) * 0.9;
const screenHeight = (Dimensions.get('window').height) * 0.75;

const styles = StyleSheet.create({
  container: {
    borderWidth: 7,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  text: {
    fontSize: 40,
    fontFamily: 'PoppinsBold',
  },
});

const SwipeChoice = ({ type }) => {
  const [fontLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontLoaded) {
    return <Loading />;
  }

  const colors = {
    LIKE: 'green',
    DISLIKE: 'red',
  };

  const color = colors[type];

  return (
    <View style={[styles.container, { borderColor: color }]}>
      <Text style={[styles.text, { color }]}>{type}</Text>
    </View>
  );
};

export default SwipeChoice;
