import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Loading } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-ionicons';
import { useFonts } from 'expo-font';
import {
  getGroupsPerUser,
  getGroupsAttendedPerUser,
  getGroupsUpcommingPerUser,
  createGroup,
} from '../../db/group';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflowY: 'scroll',
  },
  textHeader: {
    fontSize: 28,
    paddingTop: 15,
  },
  featureHeader: {
    fontSize: 22,
    paddingTop: 15,
  },
  groupName: {
    fontSize: 22,
  },
  groupImg: {
    height: 100,
    width: 100,
  },
  renderGroupContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: 10,
    border: '2px solid grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    padding: 10,
    border: '2px solid grey',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // headerText: {
  //   fontSize: 25,
  //   fontFamily: 'PoppinsBold',
  //   margin: 10,
  // },
  // bodyText: {
  //   fontFamily: 'PoppinsBold',
  //   fontSize: 15,
  // },
});

const Upcoming = () => {
  const [upcomingUserGroups, setUpcomingUserGroups] = useState([]);
  const { userId } = useSelector((state) => state.pagerData);
  // const [fontLoaded] = useFonts({
  //   Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
  //   PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
  //   Bebas: require('../../assets/fonts/BebasNeue-Regular.ttf'),
  // });

  useEffect(() => {
    async function fetchData() {
      const response = await getGroupsUpcommingPerUser('DMuiKcBDEA0q95QHzbJq');
      setUpcomingUserGroups(response); // -- GET
    }
    fetchData();
  }, []);
  // console.log('does this work?', upcomingUserGroups);

  // if (!fontLoaded) {
  //   return <Loading />;
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>GROUPS</Text>
      <Text style={styles.featureHeader}>UPCOMING</Text>
      <View style={styles.renderGroupContainer}>
        {upcomingUserGroups.map(group => {
          return (
            <View style={styles.groupContainer}>
              <Image style={styles.groupImg} source={{ uri: group.group_image }} />
              <Text style={styles.groupName} key={group.id}>{group.group_name}</Text>
              <Icon name="arrow-dropright" size={30} />
            </View>
          );
        })}
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default Upcoming;
