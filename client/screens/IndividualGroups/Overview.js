import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import globalStyles from '../../globalStyles';

const Overview = ({ navigation }) => {
  // bold specific words

  const B = (props) => <Text style={{fontWeight: '900'}}>{props.children}</Text>

  // One Schedule with time and plans
  const Schedule = (props) => (
    <View
      style={styles.schedules}
    >
      <B>12:00 PM</B>
      <Text>SCHEDULE PLANS LOGGED AND SHARED HERE.</Text>
    </View>
  )

  // One group member's picture and name
  const Member = (props) => (
    <View style={styles.members}>
      <Image
      style={styles.member}
      source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
      />
      <Text>NAME HERE</Text>
    </View>
  )

  return (
    <ScrollView >
      <View style={styles.container}>
        <Image
        style={styles.main}
        source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        />
        <Text style={styles.name}>Group Name</Text>
        <Text style={styles.desc}> <B>ORGANIZER</B>: Name Here</Text>
        <Text style={styles.desc}> {'\n'} Brief description goes here. Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries. {'\n'} </Text>

        <View style={styles.tabs}>
          <Text style={styles.selected}>OVERVIEW </Text>
          <TouchableOpacity
            title="Schedule"
            onPress={() => navigation.navigate('Schedule', { name: 'Schedule' })}
          >
            <Text style={styles.nav}>SCHEDULE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            title="Chat"
            onPress={() => navigation.navigate('Chat', { name: 'Chat' })}
          >
            <Text style={styles.nav}>CHAT</Text>
          </TouchableOpacity>

          <StatusBar style="auto" />
        </View>
        <View style={styles.separation}/>

        <View style={styles.schedule}>
          <Text> <B>SCHEDULE</B> </Text>
          <Text style={{textDecorationLine: 'underline' }}> SEE ALL </Text>
        </View>

        <Schedule />
        <Schedule />
        <Schedule />
        <Schedule />

        <View style={styles.separation}/>

        <View style={styles.schedule}>
          <Text> <B>GROUP MEMBERS</B> </Text>
          <Text style={{textDecorationLine: 'underline' }}> SEE ALL </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', borderWidth: 1, width: '100%'}}>
          <Member />
          <Member />
          <Member />
        </View>
      </View>
    </ScrollView>
  );
};

export default Overview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    overflowY: 'scroll'
  },
  main: {
    height: '27%',
    width: '50%'
  },
  name: {
    fontSize: 50
  },
  desc: {
    alignSelf: 'start',
    borderWidth: 1,
    width: '100%'
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    width: '100%'
  },
  nav: {
    padding: 5,
    borderWidth: 1,
    backgroundColor: 'black',
    color: 'white'
  },
  selected: {
    backgroundColor: '#B5179E',
    padding: 5,
    borderWidth: 1,
    color: 'white'
  },
  separation: {
    width: '90%',
    padding: 4,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  schedule: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'green',
    borderWidth: 1,
    width: '100%'
  },
  schedules: {
    marginTop: 45,
    alignSelf: 'start'
  },
  members: {
    // flexDirection: 'row'
  },
  member: {
    height: 50,
    width: 50
  }
});
