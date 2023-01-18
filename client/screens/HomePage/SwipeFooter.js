/* eslint-disable global-require */
import React, { useState, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import Loading from '../Loading/Index.js';
import globalStyles from '../../globalStyles';
import emptyBox from '../../assets/box.png';

const screenWidth = (Dimensions.get('window').width) * 0.9;
const screenHeight = (Dimensions.get('window').height) * 0.75;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 15,
    backgroundColor: 'transparent',
    width: 170,
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: -1,
  },
  text: {
    fontSize: 40,
    fontFamily: 'PoppinsBold',
  },
  buttonContainer: {
    width: 70,
    height: 70,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const SwipeFooter = ({ type }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const animateScale = useCallback((newValue) => {
    Animated.spring(scale, {
      toValue: newValue,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }, [scale]);

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
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPressIn={() => animateScale(0.8)}
        delayPressIn={0}
        onPressOut={() => animateScale(1)}
        delayPressOut={110}
      >
        <Animated.View style={[styles.buttonContainer, { transform: [{ scale }] }]}>
          <Text>X</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPressIn={() => animateScale(0.8)}
        delayPressIn={0}
        onPressOut={() => animateScale(1)}
        delayPressOut={110}
      >
        <Animated.View style={[styles.buttonContainer, { transform: [{ scale }] }]}>
          <Text>{'<3'}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SwipeFooter;
