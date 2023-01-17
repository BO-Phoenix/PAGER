import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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

const Upcoming = () => {
  const [upcomingUserGroups, setUpcomingUserGroups] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // console.log('here in the effect');

      const response = await getGroupsUpcommingPerUser('DMuiKcBDEA0q95QHzbJq');
      // await addPlan(); -- POST, PUT, DELETE
      setUpcomingUserGroups(response); // -- GET
    }
    fetchData();
  }, []);
  console.log('does this work?', upcomingUserGroups);

  return (
    <View style={styles.container}>
      <Text>Attended</Text>
      {upcomingUserGroups.map(group => {
        return <Text key={group.id}>{group.group_name}</Text>;
      })}
      <StatusBar style="auto" />
    </View>
  );
};

export default Upcoming;