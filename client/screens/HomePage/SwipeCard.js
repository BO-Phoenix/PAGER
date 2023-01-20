/* eslint-disable import/order */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable global-require */
import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import Loading from '../Loading/Index.js';
import SwipeChoice from './SwipeChoice.js';
import globalStyles from '../../globalStyles';
import emptyBox from '../../assets/box.png';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width * 0.9;
const screenHeight = Dimensions.get('window').height * 0.75;

const actionOffset = 100;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    backgroundColor: 'white',
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
  details: {
    position: 'absolute',
    paddingRight: 10,
    bottom: 22,
    left: 22,
  },
  name: {
    fontSize: 30,
    fontFamily: 'PoppinsBold',
    color: 'white',
  },
  description: {
    fontSize: 15,
    fontFamily: 'Poppins',
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

const SwipeCard = ({
  name,
  source,
  description,
  isFirst,
  swipe,
  tiltSign,
  group_id,
  nav,
  ...rest
}) => {
  const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
    inputRange: [-actionOffset, 0, actionOffset],
    outputRange: ['8deg', '0deg', '-8deg'],
  });

  const likeOpacity = swipe.x.interpolate({
    inputRange: [25, actionOffset],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const dislikeOpacity = swipe.x.interpolate({
    inputRange: [-actionOffset, -25],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const renderChoice = useCallback(() => {
    return (
      <>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.likeContainer,
            { opacity: likeOpacity },
          ]}
        >
          <SwipeChoice type="JOIN" />
        </Animated.View>

        <Animated.View
          style={[
            styles.choiceContainer,
            styles.dislikeContainer,
            { opacity: dislikeOpacity },
          ]}
        >
          <SwipeChoice type="PASS" />
        </Animated.View>
      </>
    );
  }, [likeOpacity, dislikeOpacity]);

  const [fontLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontLoaded) {
    return <Loading />;
  }

  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), { rotate }],
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Animated.View
      style={[styles.container, isFirst && animatedCardStyle]}
      {...rest}
    >
      <TouchableWithoutFeedback onPress={() => nav.navigate('Group', group_id)}>
        <Image style={styles.image} source={{ uri: source }} />
      </TouchableWithoutFeedback>

      <LinearGradient
        style={styles.gradient}
        colors={['transparent', 'black']}
      />
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      {isFirst && renderChoice()}
    </Animated.View>
  );
};

export default SwipeCard;
