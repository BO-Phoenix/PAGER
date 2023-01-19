/* eslint-disable global-require */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from 'react-native';
import { useFonts } from 'expo-font';
import globalStyles from '../../globalStyles';
import {
  getAllEvents,
  getOneEvent,
  addGroupToEvent,
  removeGroupFromEvent,
} from '../../db/event.js';
import { getGroupMembers, getGroupPlans } from '../../db/group.js';
import Loading from '../Loading/Index';

const Overview = ({ navigation, groupData }) => {
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
      fontFamily: 'Poppins',
    },
    main: {
      height: 200,
      width: 200,
    },
    name: {
      fontSize: 30,
      fontFamily: 'PoppinsBold',
    },
    rowName: {
      flexDirection: 'row',
      width: '100%',
    },
    boldDesc: {
      alignSelf: 'start',
      fontFamily: 'PoppinsBold',
      fontSize: 14,
    },
    desc: {
      alignSelf: 'start',
      // borderWidth: 1,
      fontFamily: 'Poppins',
      fontSize: 14,
    },
    tabs: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      // borderWidth: 1,
      width: '100%',
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

  // set states
  const [events, setEvents] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [plans, setPlans] = useState([]);

  // get data
  useEffect(() => {
    async function fetchData() {
      const resEvents = await getAllEvents();
      setEvents(resEvents);
      const resMembers = await getGroupMembers(groupData.id);
      setGroupMembers(resMembers);
      const resPlans = await getGroupPlans(groupData.id);
      setPlans(resPlans);
    }
    fetchData();
  }, []);

  // load font
  const [fontLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    Bebas: require('../../assets/fonts/BebasNeue-Regular.ttf'),
  });

  if (!fontLoaded) {
    return <Loading />;
  }

  // format time
  function spliceSlice(str, index, count, add) {
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
        <Image style={styles.main} source={{ uri: groupData.group_image }} />
        <Text style={styles.name}>{groupData.group_name}</Text>

        <View style={styles.rowName}>
          <Text style={styles.boldDesc}>ORGANIZER</Text>
          <Text style={styles.desc}>: Name Here</Text>
        </View>
        {/* include conditionally rendered add member button which goes to different screen */}

        <Text style={styles.desc}>{groupData.group_description}</Text>

        <View style={styles.separation} />

        <View style={styles.schedule}>
          <Text style={{ fontSize: 20 }}>
            <Text
              style={{
                alignSelf: 'start',
                fontFamily: 'PoppinsBold',
                fontSize: 20,
              }}
            >
              SCHEDULE
            </Text>
          </Text>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('Schedule', { name: 'Schedule' })
            }
          >
            <Text
              style={{
                textDecorationLine: 'underline',
                fontSize: 20,
                fontFamily: 'Poppins',
              }}
            >
              SEE ALL
            </Text>
          </TouchableWithoutFeedback>
        </View>

        <View
          style={{
            alignSelf: 'start',
            flexDirection: 'column',
            // borderWidth: 2,
            width: '100%',
          }}
        >
          {plans
            .sort((a, b) => a.time.seconds - b.time.seconds)
            .sort((a, b) => a.time - b.time)
            .slice(0, 3)
            .map((plan) => {
              let date;
              if (typeof plan.time !== 'object') {
                date = new Date(plan.time);
              } else {
                date = new Date(plan.time.seconds);
              }
              // let date = 'Tue Jan 20 1970 13:01:242424';
              date = JSON.stringify(date);
              date = date.slice(12, 17);
              const num = date.slice(0, 2);
              if (num === '12') {
                date += ' PM';
              } else if (num > 12) {
                date = spliceSlice(date, 0, 2, num - 12);
                date += ' PM';
              } else {
                date += ' AM';
              }
              return (
                <View style={styles.schedules} key={plan.id}>
                  <Text style={styles.boldDesc}>{date}</Text>
                  <Text>{plan.description}</Text>
                </View>
              );
            })}
        </View>

        <View style={styles.separation} />

        <View style={styles.schedule}>
          <Text style={{ fontSize: 20 }}>
            <Text
              style={{
                alignSelf: 'start',
                fontFamily: 'PoppinsBold',
                fontSize: 20,
              }}
            >
              GROUP MEMBERS
            </Text>
          </Text>
          {/* <TouchableOpacity
            title="Members"
            onPress={() => navigation.navigate('Members', { name: 'Members' })}
          >
            <Text style={{ textDecorationLine: 'underline', fontSize: 20 }}>
              SEE ALL
            </Text>
          </TouchableOpacity> */}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            // borderWidth: 1,
            width: '100%',
          }}
        >
          {groupData.members.map((member) => (
            <View style={styles.members} key={member.id}>
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
