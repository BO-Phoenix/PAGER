import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, SafeAreaView,
} from 'react-native';
import { Form, FormItem, Picker } from 'react-native-form-component';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Arial',
    fontWeight: 'medium',
    fontSize: 24,
  },
  formInput: {
    flex: 1,
    backgroundColor: '#fff',
    // border: '3px solid blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStyle: {
    flex: 1,
    backgroundColor: '#F72585',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTextStyle: {
    fontFamily: 'Arial',
    fontWeight: 'light',
    fontSize: 18,
  },
});

const Create = () => {
  const [size, setSize] = useState('');
  const [vibe, setVibe] = useState('');

  // const submitFormData = () => {

  // }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>I Am Create</Text> */}
      <StatusBar style="auto" />
      <Text id="create-group" style={styles.title}>
        CREATE GROUP
      </Text>
      <Form
        onButtonPress={() => console.warn('do something')}
        buttonText="CREATE GROUP"
        buttonStyle={styles.btnStyle}
        buttonTextStyle={styles.btnTextStyle}
      >
        <FormItem
          style={styles.formInput}
          id="group-name"
          placeholder="GROUP NAME"
          isRequired
        />
        <FormItem
          style={styles.formInput}
          id="group-description"
          placeholder="GROUP DESCRIPTION"
          isRequired
        />
        <Picker
          style={styles.formInput}
          id="select-size"
          placeholder="SELECT SIZE"
          items={[
            { label: 'Small (0-5)', value: 'small' },
            { label: 'Medium (6-10)', value: 'medium' },
            { label: 'Large (11-20)', value: 'large' },
          ]}
          // label="Pick a number"
          selectedValue={size}
          onSelection={(item) => setSize(item.value)}
        />
        <Picker
          style={styles.formInput}
          id="select-vibe"
          placeholder="SELECT VIBE"
          items={[
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'medium' },
            { label: 'High', value: 'high' },
          ]}
          // label="Pick a number"
          selectedValue={vibe}
          onSelection={(item) => setVibe(item.value)}
        />
        <FormItem
          style={styles.formInput}
          id="upload-img"
          placeholder="UPLOAD IMAGE"
          isRequired
        />
      </Form>
    </SafeAreaView>
  );
};

export default Create;

// ADD -- SELECT EVENT
// createGroup(formdata)
// Create a new group with all the infos

// addChatMsg(formdata) - JEFF
// Add chat message for a specific group

// addPlan(group_id, form_data) -- JEFF
// Add a new plan to the schedule for a specific group

// event_date
// event_id
// group_image
// group_name
// group_description
// member_list : user's user_id
// organizer_name : ?? redux state??
// size: string
// vibe: string

// top priority: andrew's user thing setup
// need to be able to grab user_id