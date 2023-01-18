import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import globalStyles from '../../globalStyles';
import {
  getAllEvents,
  getOneEvent,
  addGroupToEvent,
  removeGroupFromEvent,
} from '../../db/event.js';
import { getGroupMembers, getGroupPlans } from '../../db/group.js';

const Overview = ({ navigation }) => {
  // styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      // justifyContent: 'center',
      borderColor: 'black',
      // borderWidth: 10,
      padding: 10,
      overflowY: 'scroll',
      height: '200%',
    },
    main: {
      height: 200,
      width: 200,
    },
    name: {
      fontSize: 45,
    },
    desc: {
      alignSelf: 'start',
      // borderWidth: 1,
      width: '100%',
      fontSize: 14,
    },
    tabs: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      // borderWidth: 1,
      width: '100%',
    },
    nav: {
      padding: 5,
      // borderWidth: 1,
      backgroundColor: 'black',
      color: 'white',
      width: 85,
      justifySelf: 'center',
    },
    selected: {
      backgroundColor: '#B5179E',
      padding: 5,
      // borderWidth: 1,
      color: 'white',
    },
    separation: {
      width: '90%',
      padding: 10,
      borderBottomColor: 'black',
      borderBottomWidth: 1,
    },
    schedule: {
      marginTop: 5,
      marginBottom: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderColor: 'green',
      // borderWidth: 1,
      width: '100%',
    },
    schedules: {
      marginTop: 20,
      alignSelf: 'start',
      padding: 5,
      // borderWidth: 2
    },
    members: {
      // flexDirection: 'row'
    },
    member: {
      height: 50,
      width: 50,
    },
  });

  // bold specific words
  // eslint-disable-next-line react/no-unstable-nested-components
  const B = ({ children }) => (
    <Text style={{ fontWeight: '900' }}>{children}</Text>
  );

  const [events, setEvents] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resEvents = await getAllEvents();
      setEvents(resEvents);
      const resMembers = await getGroupMembers('IrIfBilvP6HSrCHzty9d');
      setGroupMembers(resMembers);
      const resPlans = await getGroupPlans('IrIfBilvP6HSrCHzty9d');
      setPlans(resPlans);
    }
    fetchData();
  }, []);

  // format time
  function spliceSlice(str, index, count, add) {
    // We cannot pass negative indexes directly to the 2nd slicing operation.
    if (index < 0) {
      index = str.length + index;
      if (index < 0) {
        index = 0;
      }
    }

    return str.slice(0, index) + (add || '') + str.slice(index + count);
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.main}
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        />
        <Text style={styles.name}>Group Name</Text>
        <Text style={styles.desc}>
          <B>ORGANIZER</B>
          {/* really long comment so prettier won't do weird things lalalala */}
          : Name Here
        </Text>

        <Text style={styles.desc}>
          {'\n'}
          Brief description goes here. Lorem ipsum is placeholder text commonly
          used in the graphic, print, and publishing industries.
          {'\n'}
        </Text>

        <View style={styles.separation} />

        <View style={styles.schedule}>
          <Text style={{ fontSize: 20 }}>
            <B>SCHEDULE</B>
          </Text>
          <TouchableOpacity
            title="Schedule"
            onPress={() =>
              navigation.navigate('Schedule', { name: 'Schedule' })
            }
          >
            <Text style={{ textDecorationLine: 'underline', fontSize: 20 }}>
              SEE ALL
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            alignSelf: 'start',
            flexDirection: 'column',
            // borderWidth: 2,
            width: '100%',
          }}
        >
          {plans.slice(0, 3).map((plan) => {
            let date = new Date(plan.time.seconds);
            date += 'string';
            date = date.slice(0, 24);
            const num = date.slice(16, 18);
            if (num > 12) {
              date = spliceSlice(date, 16, 2, num - 12);
              date += ' PM';
            } else {
              date += ' AM';
            }
            return (
              <View style={styles.schedules}>
                <B>{plan.time.seconds ? date : plan.time.seconds}</B>
                <Text>{plan.description}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.separation} />

        <View style={styles.schedule}>
          <Text style={{ fontSize: 20 }}>
            <B>GROUP MEMBERS</B>
          </Text>
          <TouchableOpacity
            title="Members"
            onPress={() => navigation.navigate('Members', { name: 'Members' })}
          >
            <Text style={{ textDecorationLine: 'underline', fontSize: 20 }}>
              SEE ALL
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            // borderWidth: 1,
            width: '100%',
          }}
        >
          {groupMembers.map((member) => (
            // <Member
            //   key={member.id}
            //   first={member.first_name}
            //   last={member.last_name}
            //   pfp={member.profile_pic}
            // />

            <View style={styles.members}>
              <Image
                style={styles.member}
                source={{ uri: member.profile_pic }}
              />
              <Text>
                {member.first_name}
                {member.last_name}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Overview;
