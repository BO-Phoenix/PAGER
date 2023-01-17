import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import globalStyles from '../../globalStyles';

const Overview = ({ navigation }) => {
  // I am most likely going to have to pick another navigation method in order to make this look like the wireframe we have drawn on figma
  //bold specific words
  const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

  return (
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
      <View style={styles.schedules}>
        <Text> <B>SCHEDULE</B> </Text>
        <Text style={{alignSelf: 'end'}}> SEE ALL </Text>

        <B>12:00 PM</B>
        <Text>SCHEDULE PLANS LOGGED AND SHARED HERE.</Text>
        <B>12:00 PM</B>
        <Text>SCHEDULE PLANS LOGGED AND SHARED HERE.</Text>
        <B>12:00 PM</B>
        <Text>SCHEDULE PLANS LOGGED AND SHARED HERE.</Text>

      </View>
    </View>
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
    padding: 10
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
  schedules: {
    borderColor: 'green',
    borderWidth: 1,
    alignSelf: 'end',
    width: '100%'
  }
});
