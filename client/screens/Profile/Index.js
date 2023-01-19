/* eslint-disable operator-linebreak */
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
  Alert,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import { useFonts } from 'expo-font';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getUser } from '../../db/user.js';
import Loading from '../Loading/Index.js';
import globalStyles from '../../globalStyles';
import emptyBox from '../../assets/box.png';
import Card from './Card';
import TasteCard from './TasteCard';
import { useAuthentication } from '../../utils/hooks/useAuthentication';

const auth = getAuth();

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
    marginTop: 10,
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
  bodyContainerRight: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    textDecorationLine: 'underline',
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
  bodyContainerRow: {
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
    paddingVertical: 10,
    paddingHorizontal: 32,
    backgroundColor: '#F72585',
    fontFamily: 'PoppinsBold',
    color: 'white',
    marginBottom: 5,
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
});

const Profile = ({ navigation }) => {
  const { userId } = useSelector((state) => state.pagerData);
  const [user, setUser] = useState({});
  const [musicTastes, setMusicTastes] = useState([]);
  const [friends, setFriends] = useState([]);
  const [fontLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    Bebas: require('../../assets/fonts/BebasNeue-Regular.ttf'),
  });

  useEffect(() => {
    async function fetchData() {
      const res = await getUser(userId);
      console.log(res, 'res');
      setUser(res[0]);
      setMusicTastes(res[0].music_tastes);
      setFriends(res[0].friends_list);
      console.log(friends, 'friends');
    }
    fetchData();
  }, []);

  if (!fontLoaded) {
    return <Loading />;
  }
  return (
    // onPress={() => auth.signOut()}
    <View style={styles.container}>
      <View style={styles.bodyContainerRight}>
        <Pressable onPress={() => auth.signOut()}>
          <Text style={styles.textDetailBold}>SIGN OUT</Text>
        </Pressable>
      </View>
      <Image style={styles.headerImage} source={user.profile_pic} />
      <View style={styles.bodyContainerCenter}>
        <Text style={styles.headerName}>
          {`${user.first_name} ${user.last_name}`}
        </Text>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text style={styles.buttonText}>EDIT PROFILE</Text>
      </Pressable>
      <View style={styles.bodyContainerLeft}>
        <Text style={styles.textDetail}>{`${user.description}`}</Text>
      </View>
      <View style={styles.bodyContainerSection}>
        <Text style={styles.textTitle}>MUSIC TASTES</Text>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('ExpandedTastes')}
        >
          <Text style={styles.textDetail}>SEE ALL</Text>
        </TouchableWithoutFeedback>
      </View>
      {/* <View style={styles.bodyContainerSection}> */}
      <View style={styles.bodyContainerRow}>
        {musicTastes &&
          musicTastes
            .slice(0, 3)
            .map((taste) => <TasteCard prop={taste} key={taste} />)}
      </View>
      <View style={styles.bodyContainerSection}>
        <Text style={styles.textTitle}>FRIENDS</Text>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('ExpandedFriends')}
        >
          <Text style={styles.textDetail}>SEE ALL</Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.bodyContainerSection}>
        {!!friends &&
          friends
            .slice(0, 3)
            .map((friend) => (
              <Card
                prop={friend}
                key={Math.random()}
                friends={friends}
                setFriends={setFriends}
              />
            ))}
      </View>
    </View>
  );
};

export default Profile;
