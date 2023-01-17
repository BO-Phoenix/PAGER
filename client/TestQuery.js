import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
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
} from './db/group';

export default function TestQuery() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // console.log('here in the effect');

      const response = await getGroupsPerEvent();
      // await addPlan(); -- POST, PUT, DELETE
      // setItems(response); -- GET
    }
    fetchData();
  }, []);

  return (
    <View>
      {!!items.length > 0 && (
        <FlatList
          data={items}
          keyExtractor={(item) => item.group_id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.user_name}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
