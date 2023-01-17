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
  headerImage: {
    width: 200,
    height: 200,
    marginTop: 15,
  },
  headerName: {
    fontSize: 30,
    fontFamily: 'PoppinsBold',
  },
  bodyContainerCenter: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginVertical: 5,
    marginHorizontal: 15,
    // borderWidth: 1,
    // borderColor: 'black',
  },
  bodyContainerLeft: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  bodyContainerSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginBottom: 5,
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
  bodyContainerMember: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'white',
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

const Index = () => {
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
      <Image style={styles.headerImage} source={require('../../assets/box.png')} />
      <View style={styles.bodyContainerCenter}>
        <Text style={styles.headerName}>Group Name</Text>
      </View>
      <View style={styles.bodyContainerLeft}>
        <Text style={styles.textDetailBold}>Organizer Name: </Text>
        <Text style={styles.textDetail}>Name Here</Text>
      </View>
      <View style={styles.bodyContainerLeft}>
        <Text style={styles.textDetail}>
          Group description goes here. Blah blah blah blah. Blabh blabh.
        </Text>
      </View>

      <View style={styles.bodyContainerSection}>
        <Text style={styles.textTitle}>
          SCHEDULE
        </Text>
        <Text style={styles.textDetail}>
          SEE ALL
        </Text>
      </View>
      <View style={styles.bodyContainerSection}>
        <View style={styles.bodyContainerSchedule}>
          <Text style={styles.textDetailBold}>TIME</Text>
          <Text style={styles.textDetail}>Detail</Text>
        </View>
      </View>
      <View style={styles.bodyContainerSection}>
        <View style={styles.bodyContainerSchedule}>
          <Text style={styles.textDetailBold}>TIME</Text>
          <Text style={styles.textDetail}>Detail</Text>
        </View>
      </View>
      <View style={styles.bodyContainerSection}>
        <View style={styles.bodyContainerSchedule}>
          <Text style={styles.textDetailBold}>TIME</Text>
          <Text style={styles.textDetail}>Detail</Text>
        </View>
      </View>
      <View style={styles.bodyContainerSection}>
        <Text style={styles.textTitle}>
          MEMBERS
        </Text>
        <Text style={styles.textDetail}>
          SEE ALL
        </Text>
      </View>
      <View style={styles.bodyContainerSection}>
        <View style={styles.bodyContainerMember}>
          <Image style={styles.memberImage} source={require('../../assets/box.png')} />
          <Text style={styles.textDetail}>Name Here</Text>
        </View>
        <View style={styles.bodyContainerMember}>
          <Image style={styles.memberImage} source={require('../../assets/box.png')} />
          <Text style={styles.textDetail}>Name Here</Text>
        </View>
        <View style={styles.bodyContainerMember}>
          <Image style={styles.memberImage} source={require('../../assets/box.png')} />
          <Text style={styles.textDetail}>Name Here</Text>
        </View>
      </View>
    </View>
  );
};

export default Index;
