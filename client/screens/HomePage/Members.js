/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  CheckBox,
  FlatList,
} from 'react-native';
import { useFonts } from 'expo-font';
import Loading from '../Loading/Index.js';
import globalStyles from '../../globalStyles';
import emptyBox from '../../assets/box.png';
import {
  getGroup,
  getGroupsPerUser,
  getGroupsAttendedPerUser,
} from '../../db/group.js';

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
    // borderWidth: 1,
    // borderColor: 'black',
  },
  headerImage: {
    width: 75,
    height: 75,
    marginRight: 15,
    marginVertical: 15,
  },
  memberImage: {
    width: 75,
    height: 75,
    marginRight: 15,
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
    marginBottom: 15,
    // paddingHorizontal: 10,
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
  bodyContainerLeft: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 15,
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
});

const Memebers = ({ route }) => {
  const [group, setGroup] = useState();

  useEffect(() => {
    setGroup(route.params);
  }, []);
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
      <View style={styles.bodyContainerName}>
        {!!group && (
          <Image
            style={styles.headerImage}
            source={{ uri: group.group_image }}
          />
        )}

        <Text style={styles.headerName}>{!!group && group.group_name}</Text>
      </View>
      <View style={styles.bodyContainerSection}>
        <Text style={styles.textTitle}>MEMBERS</Text>
      </View>
      <View style={styles.bodyContainerLeft}>
        {!!group && (
          <FlatList
            data={group.members}
            keyExtractor={(member) => member.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.bodyContainerMember}>
                <Image
                  style={styles.memberImage}
                  source={{ uri: item.profile_pic }}
                />
                <Text style={styles.textDetail}>{item.first_name}</Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Memebers;
