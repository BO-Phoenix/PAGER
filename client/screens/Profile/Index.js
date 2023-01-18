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
import Card from './Card';

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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: '#F72585',
    fontFamily: 'PoppinsBold',
    color: 'white',
    margin: 10,
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

const Profile = () => {
  const [user, setUser] = useState([]);
  const [musicTastes, setMusicTastes] = useState([]);
  const [friends, setFriends] = useState([]);
  const [fontLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    Bebas: require('../../assets/fonts/BebasNeue-Regular.ttf'),
  });

  useEffect(() => {
    async function fetchData() {
      const res = await getUser('I4nwq9hMAQin0BjCEe1U');
      setUser(res[0]);
      setMusicTastes([...res[0].music_tastes]);
      setFriends([...res[0].friends_list]);
      // const resMembers = await getGroupMembers('IrIfBilvP6HSrCHzty9d');
      // setGroupMembers(resMembers);
      // const resPlans = await getGroupPlans('IrIfBilvP6HSrCHzty9d');
      // setPlans(resPlans);
      // console.log(user);
    }
    fetchData();
  }, []);

  if (!fontLoaded) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.headerImage}
        source={require('../../assets/box.png')}
      />
      <View style={styles.bodyContainerCenter}>
        <Text style={styles.headerName}>
          {`${user.first_name} ${user.last_name}`}
        </Text>
      </View>
      <Pressable style={styles.button}>EDIT</Pressable>
      {/* <View>{user}</View> */}
      {/* <View style={styles.bodyContainerLeft}>
        <Text style={styles.textDetailBold}>Organizer Name: </Text>
        <Text style={styles.textDetail}>Name Here</Text>
      </View> */}
      <View style={styles.bodyContainerLeft}>
        <Text style={styles.textDetail}>{`${user.description}`}</Text>
      </View>

      {/* <View style={styles.bodyContainerSection}>
        <Text style={styles.textTitle}>SCHEDULE</Text>
        <Text style={styles.textDetail}>SEE ALL</Text>
      </View> */}
      {/* <View style={styles.bodyContainerSection}>
        <View style={styles.bodyContainerSchedule}>
          <Text style={styles.textDetailBold}>TIME</Text>
          <Text style={styles.textDetail}>Detail</Text>
        </View>
      </View> */}
      {/* <View style={styles.bodyContainerSection}>
        <View style={styles.bodyContainerSchedule}>
          <Text style={styles.textDetailBold}>TIME</Text>
          <Text style={styles.textDetail}>Detail</Text>
        </View>
      </View> */}
      {/* <View style={styles.bodyContainerSection}>
        <View style={styles.bodyContainerSchedule}>
          <Text style={styles.textDetailBold}>TIME</Text>
          <Text style={styles.textDetail}>Detail</Text>
        </View>
      </View> */}
      <View style={styles.bodyContainerSection}>
        <Text style={styles.textTitle}>MUSIC TASTES</Text>
        <Text style={styles.textDetail}>SEE ALL</Text>
      </View>
      <View style={styles.bodyContainerSection}>
        {musicTastes &&
          musicTastes
            .slice(0, 3)
            .map((taste) => <Card musicTaste={taste} key={taste} />)}
        {/* <View style={styles.bodyContainerMember}>

          <Image
            style={styles.memberImage}
            source={require('../../assets/box.png')}
          />
          <Text style={styles.textDetail}>Name Here</Text>
        </View>
        <Card /> */}
      </View>
      <View style={styles.bodyContainerSection}>
        <Text style={styles.textTitle}>FRIENDS</Text>
        <Text style={styles.textDetail}>SEE ALL</Text>
      </View>
      <View style={styles.bodyContainerSection}>
        {friends &&
          friends
            .slice(0, 3)
            .map((friend) => <Card musicTaste={friend} key={friend} />)}
        {/* <View style={styles.bodyContainerMember}>
          <Image
            style={styles.memberImage}
            source={require('../../assets/box.png')}
          />
          <Text style={styles.textDetail}>Name Here</Text>
        </View>
        <View style={styles.bodyContainerMember}>
          <Image
            style={styles.memberImage}
            source={require('../../assets/box.png')}
          />
          <Text style={styles.textDetail}>Name Here</Text>
        </View>
        <View style={styles.bodyContainerMember}>
          <Image
            style={styles.memberImage}
            source={require('../../assets/box.png')}
          />
          <Text style={styles.textDetail}>Name Here</Text>
        </View> */}
      </View>
    </View>
  );
};

export default Profile;
