/* eslint-disable global-require */
import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Dimensions, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import Loading from '../Loading/Index.js';
import SwipeChoice from './SwipeChoice.js';
import globalStyles from '../../globalStyles';
import emptyBox from '../../assets/box.png';

const screenWidth = (Dimensions.get('window').width) * 0.9;
const screenHeight = (Dimensions.get('window').height) * 0.65;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 15,
  },
  image: {
    width: screenWidth,
    height: screenHeight,
    borderRadius: 20,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    borderRadius: 20,
  },
  name: {
    position: 'absolute',
    bottom: 22,
    left: 22,
    fontSize: 30,
    fontFamily: 'PoppinsBold',
    color: 'white',
  },
  choiceContainer: {
    position: 'absolute',
    top: 100,
  },
  likeContainer: {
    left: 45,
    transform: [{ rotate: '-30deg' }],
  },
  dislikeContainer: {
    right: 45,
    transform: [{ rotate: '30deg' }],
  },
});

const SwipeCard = ({ name, source, isFirst, ...rest }) => {
  const renderChoice = useCallback(() => {
    return (
      <>
        <View style={[styles.choiceContainer, styles.likeContainer]}>
          <SwipeChoice type="LIKE" />
        </View>
        <View style={[styles.choiceContainer, styles.dislikeContainer]}>
          <SwipeChoice type="DISLIKE" />
        </View>
      </>
    );
  }, []);

  const [fontLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontLoaded) {
    return <Loading />;
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Animated.View style={styles.container} {...rest}>
      <Image style={styles.image} source={source} />
      <LinearGradient style={styles.gradient} colors={['transparent', 'black']} />
      <Text style={styles.name}>{name}</Text>

      {
        isFirst && renderChoice()
      }
    </Animated.View>
  );
};

export default SwipeCard;
