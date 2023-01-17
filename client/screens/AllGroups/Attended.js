import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, Button, TouchableOpacity,
} from 'react-native';
import {
  getGroupsPerEvent,
  getGroupsPerUser,
  getGroupsAttendedPerUser,
  getGroupsUpcommingPerUser,
  getChatMsgsPerGroup,
  createGroup,
  sendRequestToGroup,
  rejectGroup,
  invitePeopleToGroup,
  addChatMsg,
  getGroupMembers,
  acceptInGroup,
  getGroupPlans,
  addPlan,
  deletePlan,
} from '../../db/group';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Attended = ({ navigation }) => {
  const [attendedUserGroups, setAttendedUserGroups] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // console.log('here in the effect');

      const response = await getGroupsAttendedPerUser('DMuiKcBDEA0q95QHzbJq');
      // await addPlan(); -- POST, PUT, DELETE
      setAttendedUserGroups(response); // -- GET
    }
    fetchData();
  }, []);
  console.log('does this work?', attendedUserGroups);

  return (
    <View style={styles.container}>
      <Text>Attended</Text>
      {attendedUserGroups.map(group => {
        return <Text key={group.id}>{group.group_name}</Text>;
      })}
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
