/* eslint-disable operator-linebreak */
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
import { useSelector } from 'react-redux';
import { useFonts } from 'expo-font';
import { getUser } from '../../db/user.js';
import Loading from '../Loading/Index.js';
import globalStyles from '../../globalStyles';
import emptyBox from '../../assets/box.png';
import Card from './Card';
import UserHeader from './UserHeader';

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
    width: 75,
    height: 75,
    marginRight: 15,
  },
  headerName: {
    fontSize: 20,
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
  buttonText: {
    fontFamily: 'PoppinsBold',
    color: 'white',
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
  bodyContainerName: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 10,
    // borderWidth: 1,
    // borderColor: 'red',
  },
});

const ExpandedFriends = ({ route }) => {
  const userData = route.params;
  // console.log('friends route: ', userData);
  const [user, setUser] = useState({});
  const [musicTastes, setMusicTastes] = useState([]);
  const [friends, setFriends] = useState([]);
  // const { userId } = useSelector((state) => state.pagerData);
  const [fontLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    Bebas: require('../../assets/fonts/BebasNeue-Regular.ttf'),
  });

  useEffect(() => {
    //   async function fetchData() {
    //     const res = await getUser(userId);
    //     setUser(res[0]);
    //     setMusicTastes(res[0].music_tastes);
    //     setFriends(res[0].friends_list);
    //   }
    //   fetchData();
    setUser(userData);
    setMusicTastes(userData.music_tastes);
    setFriends(userData.friends_list);
  }, []);

  if (!fontLoaded) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainerName}>
        <Image style={styles.headerImage} source={user.profile_pic} />
        <Text style={styles.headerName}>
          {user.first_name} {user.last_name}
        </Text>
      </View>
      <View style={styles.bodyContainerSection}>
        <Text style={styles.textTitle}>FRIENDS</Text>
      </View>
      <View style={styles.bodyContainerSection}>
        {friends &&
          friends.map((item) => <Card prop={item} key={Math.random()} />)}
      </View>
    </View>
  );
};

export default ExpandedFriends;
