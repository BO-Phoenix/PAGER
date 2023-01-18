import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, Button, Image, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-ionicons';
import { useSelector } from 'react-redux';
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
  // underline: {
  //   borderBottomWidth: '10',
  //   borderBottomColor: 'black',
  //   borderBottomStyle: 'solid',
  // },
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
});

const Attended = ({ navigation }) => {
  const [attendedUserGroups, setAttendedUserGroups] = useState([]);
  const { userId } = useSelector((state) => state.pagerData);

  useEffect(() => {
    async function fetchData() {
      const response = await getGroupsAttendedPerUser('DMuiKcBDEA0q95QHzbJq');
      setAttendedUserGroups(response); // -- GET
    }
    fetchData();
  }, []);
  // console.log('does this work?', attendedUserGroups);

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>GROUPS</Text>
      <Text style={styles.featureHeader}>ATTENDED</Text>
      <View style={styles.renderGroupContainer}>
        {attendedUserGroups.map(group => {
          return (
            <View style={styles.groupContainer}>
              <Image style={styles.groupImg} source={{ uri: group.group_image }} />
              <Text style={styles.groupName} key={group.id}>{group.group_name}</Text>
              <Icon name="arrow-dropright" size={30} />
            </View>
          );
        })}
      </View>
      {/* <TouchableOpacity
        title="Upcoming"
        onPress={() => navigation.navigate('Upcoming', { name: 'Upcoming' })}
      >
        <Text>Upcoming</Text>
      </TouchableOpacity>

      <TouchableOpacity
        title="Create"
        onPress={() => navigation.navigate('Create', { name: 'Create' })}
      >
        <Text>Create</Text>
      </TouchableOpacity> */}

      {/* <Button
      title="Upcoming"
      onPress={() =>
        navigation.navigate('Upcoming', {name: 'Upcoming'})
      } /> */}
      <StatusBar style="auto" />
    </View>
  );
};

export default Attended;
