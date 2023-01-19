/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  CheckBox,
  Button,
} from 'react-native';
import { useFonts } from 'expo-font';
import { getUser, deleteFriend } from '../../db/user.js';
import { getGroupsPerUser } from '../../db/group.js';

import Loading from '../Loading/Index.js';
import globalStyles from '../../globalStyles';
import emptyBox from '../../assets/box.png';

const styles = StyleSheet.create({
  bodyContainerMember: {
    flex: 1,
    // flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'white',
    // paddingVertical: 0,
    // paddingHorizontal: 15,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    // width: 15,
    // height: 15,
    backgroundColor: '#F72585',
    fontFamily: 'PoppinsBold',
    color: 'white',
    margin: 10,
  },
  buttonText: {
    fontSize: 10,
    fontFamily: 'Poppins',
    color: 'white',
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

const Card = ({ prop, friends, setFriends }) => {
  // console.log('friend: ', prop);
  const { userId } = useSelector((state) => state.pagerData);
  const [fontLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    Bebas: require('../../assets/fonts/BebasNeue-Regular.ttf'),
  });
  const unfriend = async (id) => {
    console.log('ids: ', id, userId);
    // getGroupsPerUser(id);
    const test = await deleteFriend(userId, id);
    console.log(test, 'test');
    // setFriends([...friends]);
  };
  if (!fontLoaded) {
    return <Loading />;
  }

  return (
    <View style={styles.bodyContainerMember}>
      <Image style={styles.memberImage} source={prop.profile_pic} />

      {/* <Button class="btn" onPress={() => unfriend(prop.last_name)}>
        <Text>x</Text>
      </Button> */}
      <Text style={styles.textDetail}>{prop.first_name}</Text>
      <Pressable style={styles.button} onPress={() => unfriend(prop.id)}>
        <Text style={styles.buttonText}>Unfriend</Text>
      </Pressable>
    </View>
  );
};

export default Card;
