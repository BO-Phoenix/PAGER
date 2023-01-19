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
  TouchableWithoutFeedback,
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
  bodyContainerContentMem: {
    width: '100%',
    alignItems: 'space-between',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
  },
  bodyContainerSchedule: {
    // width: '100%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#F5F5F5',
    marginBottom: 10,
    padding: 5,
    // paddingVertical: 0,
    // paddingHorizontal: 15,
    // borderWidth: 1,
    // borderColor: 'black',
  },
  bodyContainerMember: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // width: '100%',
    // backgroundColor: 'white',
    // paddingVertical: 0,
    // paddingHorizontal: 15,
    // borderColor: 'red',
    // borderWidth: 3,
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
    // textDecorationLine: 'underline',
  },
  textSeeAll: {
    fontSize: 15,
    fontFamily: 'Poppins',
    textDecorationLine: 'underline',
  },
  memberImage: {
    width: 75,
    height: 75,
    // borderColor: 'green',
    // borderWidth: 1,
  },
});

const Expanded = ({ group_info, navigation }) => {
  const [group, setGroup] = useState();
  useEffect(() => {
    async function fetchData() {
      const group_obj = await getGroup('IrIfBilvP6HSrCHzty9d');
      setGroup(group_obj);
    }
    fetchData();
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
      {!!group && (
        <Image style={styles.headerImage} source={{ uri: group.group_image }} />
      )}

      <View style={styles.bodyContainerCenter}>
        <Text style={styles.headerName}>{!!group && group.group_name}</Text>
      </View>
      <View style={styles.bodyContainerLeft}>
        <Text style={styles.textDetailBold}>Organizer Name: </Text>
        <Text style={styles.textDetail}>{!!group && group.organizer_name}</Text>
      </View>
      <View style={styles.bodyContainerLeft}>
        <Text style={styles.textDetail}>{!!group && group.description}</Text>
      </View>

      <View style={styles.bodyContainerSection}>
        <Text style={styles.textTitle}>SCHEDULE</Text>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Schedule', group)}
        >
          <Text style={styles.textSeeAll}>SEE ALL</Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.bodyContainerLeft}>
        {!!group && (
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={false}
            data={group.plans.length > 3 ? group.plans.slice(0, 3) : group.plans}
            keyExtractor={(plan) => plan.id.toString()}
            renderItem={({ item }) => {
              return (
                <View style={styles.bodyContainerSchedule}>
                  <Text style={styles.textDetailBold}>
                    {!!group && new Date(item.time.seconds * 1000).toDateString()}
                  </Text>
                  <Text style={styles.textDetail}>{item.description}</Text>
                </View>
              );
            }}
          />
        )}
      </View>
      <View style={styles.bodyContainerSection}>
        <Text style={styles.textTitle}>MEMBERS</Text>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Member', group)}
        >
          <Text style={styles.textSeeAll}>SEE ALL</Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.bodyContainerContentMem}>
        {!!group && (
          <FlatList
            data={
              group.members.length > 3
                ? group.members.slice(0, 3)
                : group.members
            }
            // keyExtractor={(member) => member.id.toString()}
            numColumns={3}
            renderItem={({ item }) => {
              return (
                <View style={styles.bodyContainerMember}>
                  <Image
                    style={styles.memberImage}
                    source={{ uri: item.profile_pic }}
                  />
                  <Text style={styles.textDetail}>{item.first_name}</Text>
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

export default Expanded;
