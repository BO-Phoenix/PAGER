/* eslint-disable global-require */
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Animated, PanResponder, useRef } from 'react-native';
import { useFonts } from 'expo-font';
import Loading from '../Loading/Index.js';
import SwipeCard from './SwipeCard.js';
import SwipeFooter from './SwipeFooter.js';
import globalStyles from '../../globalStyles';
import emptyBox from '../../assets/box.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

const Swipe = () => {
  const groups = [
    { id: '1', source: require('../../assets/test.gif'), name: 'Name' },
    { id: '2', source: require('../../assets/test.gif'), name: 'Test' },
    { id: '3', source: require('../../assets/test.gif'), name: 'Ug' },
    { id: '4', source: require('../../assets/test.gif'), name: 'Ly' },
    { id: '5', source: require('../../assets/box.png'), name: 'Boy' },
  ];

  const swipe = useRef(new Animated.ValueXY()).current;
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      console.log(gesture);
    },
    onPanResponderRelease: (_, gestrue) => {
      console.log('end');
    },
  });

  const [fontLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontLoaded) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {groups.map(({ name, source }, index) => {
        const isFirst = index === 0;
        const dragHandlers = isFirst ? panResponder.panHandlers : {};
        return (
          <SwipeCard
            key={name}
            name={name}
            source={source}
            isFirst={isFirst}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...dragHandlers}
          />
        );
      }).reverse()}
      <SwipeFooter />
    </View>
  );
};

export default Swipe;
