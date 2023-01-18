/* eslint-disable global-require */
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, CheckBox } from 'react-native';
import { useFonts } from 'expo-font';
import Loading from '../Loading/Index.js';
import globalStyles from '../../globalStyles';
import emptyBox from '../../assets/box.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 10,
    overflow: 'scroll',
    backgroundColor: 'white',
    // borderWidth: 1,
    // borderColor: 'black',
  },
  bodyContainerName: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 5,
    // marginHorizontal: 15,
    // borderWidth: 1,
    // borderColor: 'black',
  },
  headerImage: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
  },
  headerName: {
    fontSize: 25,
    fontFamily: 'PoppinsBold',
  },
  bodyContainerMember: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  bodyContainerSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginTop: 5,
  },
  bodyContainerSchedule: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    // paddingVertical: 0,
    // paddingHorizontal: 15,
  },
  textTitle: {
    fontSize: 20,
    fontFamily: 'PoppinsBold',
  },
  textDetailBold: {
    fontSize: 15,
    fontFamily: 'PoppinsBold',
  },
  textDetail: {
    fontSize: 15,
    fontFamily: 'Poppins',
  },
  memberImage: {
    width: 75,
    height: 75,
  },
});

const Memebers = () => {
  const [fontLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    Bebas: require('../../assets/fonts/BebasNeue-Regular.ttf'),
  });

  if (!fontLoaded) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainerSection}>
        <Text style={styles.textDetail}>
          {'< '}
          BACK
        </Text>
      </View>
      <View style={styles.bodyContainerName}>
        <Image style={styles.headerImage} source={require('../../assets/box.png')} />
        <Text style={styles.headerName}>Group Name</Text>
      </View>
      <View style={styles.bodyContainerSection}>
        <Text style={styles.textDetailBold}>MEMBERS</Text>
      </View>
      <View style={styles.bodyContainerMember}>
        <Image style={styles.headerImage} source={require('../../assets/box.png')} />
        <Text style={styles.textDetail}>Name Here</Text>
      </View>
      <View style={styles.bodyContainerMember}>
        <Image style={styles.headerImage} source={require('../../assets/box.png')} />
        <Text style={styles.textDetail}>Name Here</Text>
      </View>
      <View style={styles.bodyContainerMember}>
        <Image style={styles.headerImage} source={require('../../assets/box.png')} />
        <Text style={styles.textDetail}>Name Here</Text>
      </View>
    </View>
  );
};

export default Memebers;
