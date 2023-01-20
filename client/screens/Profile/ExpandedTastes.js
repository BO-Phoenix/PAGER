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
  FlatList,
  CheckBox,
} from 'react-native';
import { useFonts } from 'expo-font';
import { getUser } from '../../db/user.js';
import Loading from '../Loading/Index.js';
import globalStyles from '../../globalStyles';
import emptyBox from '../../assets/box.png';
import TasteCard from './TasteCard';
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
  bodyContainerCards: {
    alignItems: 'center',
    flex: 1,
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    width: '100%',
    // flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    // paddingVertical: 90,
    // paddingHorizontal: 50,
    // paddingBottom: 50,
    // marginBottom: 5,
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
  taste: {
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    padding: 15,
    flexWrap: 'wrap',
    marginVertical: 5,
    margin: 'auto',
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
  filterContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'space-between',
    justifyContent: 'center',
    margin: 10,
  },
});

const ExpandedTastes = ({ route }) => {
  const { userId } = useSelector((state) => state.pagerData);
  const userData = route.params;
  // console.log('userData from tastes: ', userData);
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
    async function fetchData() {
      const res = await getUser(userId);
      setUser(res[0]);
      setMusicTastes([...res[0].music_tastes]);
    }
    fetchData();
    // setUser(userData);
    // setMusicTastes(userData.music_tastes);
    // setFriends(userData.friends_list);
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
        <Text style={styles.textTitle}>MUSIC TASTES</Text>
      </View>

      <View style={styles.filterContainer}>
        <FlatList
          data={musicTastes}
          // keyExtractor={(events) => events.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.taste}>
              <Text style={styles.textDetailBold}>{item.toUpperCase()}</Text>
            </View>
          )}
        />
      </View>

      {/* <View style={styles.bodyContainerRow}>
        {musicTastes &&
          musicTastes.map((taste, idx) => (
            // <TasteCard prop={taste} key={Math.random()} />
            <View style={styles.taste} key={Math.random()}>
              <Text style={styles.textDetailBold}>{taste}</Text>
            </View>
          ))}
      </View> */}
    </View>
  );
};

export default ExpandedTastes;
