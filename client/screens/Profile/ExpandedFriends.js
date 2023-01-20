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
  FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useFonts } from 'expo-font';
import { getUser, deleteFriend } from '../../db/user.js';
import Loading from '../Loading/Index.js';
import globalStyles from '../../globalStyles';
import emptyBox from '../../assets/box.png';
import Card from './Card';
import UserHeader from './UserHeader';
import ExpandedFriendsCard from './ExpandedFriendsCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 10,
    overflow: 'scroll',
    backgroundColor: 'white',
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
  },
  bodyContainerMember: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    marginBottom: 15,
    // paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: '#F72585',
    fontFamily: 'PoppinsBold',
    color: 'white',
    margin: 10,
  },
  buttonText: {
    fontFamily: 'PoppinsBold',
    color: 'white',
    fontSize: 12,
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
    marginRight: 15,
  },
  bodyContainerName: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 10,
  },
  imageName: {
    flexDirection: 'row',
  },
  imageNameContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    margin: 5,
  },
});

const ExpandedFriends = ({ route }) => {
  const userData = route.params;
  const [user, setUser] = useState({});
  const [musicTastes, setMusicTastes] = useState([]);
  const [friends, setFriends] = useState([]);
  const [fontLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
  });
  const { userId } = useSelector((state) => state.pagerData);

  const unfriend = async (friendId) => {
    console.log('userId: ', userId);
    const test = await deleteFriend(userId, friendId);
  };

  useEffect(() => {
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
          {user.first_name}
          {' '}
          {user.last_name}
        </Text>
      </View>
      <View style={styles.bodyContainerSection}>
        <Text style={styles.textTitle}>FRIENDS</Text>
      </View>
      <View style={styles.bodyContainerLeft}>
        {!!friends && (
          <FlatList
            data={friends}
            renderItem={({ item }) => (

              <View style={styles.imageNameContainer} key={Math.random()}>
                <View style={styles.imageName}>
                  <View>
                    <Image
                      style={styles.memberImage}
                      source={{ uri: item.profile_pic }}
                    />
                  </View>
                  <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  >
                    <Text style={styles.textDetail}>
                      {item.first_name}
                      {' '}
                      {item.last_name}
                    </Text>
                  </View>
                </View>
                <View>
                  <Pressable style={styles.button} onPress={() => unfriend(item.id)}>
                    <Text style={styles.buttonText}>UNFRIEND</Text>
                  </Pressable>
                </View>
              </View>
            )}
          />
        )}
      </View>

      {/* <View style={styles.bodyContainerSection}>
        {friends &&
          friends.map((item) => (
            <ExpandedFriendsCard prop={item} key={Math.random()} />
          ))}
      </View> */}
    </View>
  );
};

export default ExpandedFriends;
