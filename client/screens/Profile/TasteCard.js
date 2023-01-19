/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  CheckBox,
} from 'react-native';
import { useFonts } from 'expo-font';
import { getUser } from '../../db/user.js';
import Loading from '../Loading/Index.js';
import globalStyles from '../../globalStyles';
import emptyBox from '../../assets/box.png';

const styles = StyleSheet.create({
  // bodyContainerMember: {
  // flex: 1,
  // flexDirection: 'column',
  // alignItems: 'center',
  // justifyContent: 'center',
  // backgroundColor: 'white',
  // paddingVertical: 0,
  // paddingHorizontal: 15,
  // },
  square: {
    display: 'flex',
    width: 80,
    height: 80,
    backgroundColor: 'grey',
    justifyContent: 'space-between',
    margin: 15,
  },
  text: {
    margin: 'auto',
  },
  // textDetail: {
  //   fontSize: 15,
  //   fontFamily: 'Poppins',
  // },
  memberImage: {
    width: 75,
    height: 75,
  },
});

const TasteCard = ({ prop }) => {
  const [fontLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    Bebas: require('../../assets/fonts/BebasNeue-Regular.ttf'),
  });

  if (!fontLoaded) {
    return <Loading />;
  }

  return (
    <View style={styles.square}>
      <Text style={styles.text}>{prop}</Text>
    </View>
  );
};

export default TasteCard;
