/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/style-prop-object */
import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Form, FormItem, Picker } from 'react-native-form-component';
import { useSelector } from 'react-redux';
import {
  getGroupsPerUser,
  getGroupsAttendedPerUser,
  getGroupsUpcommingPerUser,
  createGroup,
} from '../../db/group';
import { getAllEvents } from '../../db/event';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflowY: 'scroll',
  },
  title: {
    fontFamily: 'Arial',
    fontWeight: 'medium',
    fontSize: 24,
    paddingTop: 15,
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
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupImg, setGroupImg] = useState('');
  const [size, setSize] = useState('');
  const [vibe, setVibe] = useState('');
  const [event, setEvent] = useState('');

  const [allEvents, setAllEvents] = useState([]);
  const { userId } = useSelector((state) => state.pagerData);

  const groupNameInput = useRef();
  const groupDescriptionInput = useRef();
  const groupImgInput = useRef();

  useEffect(() => {
    async function fetchData() {
      const response = await getAllEvents();
      // setAllEvents(response);
      const reformatEvents = await response.reduce((acc, eventObj) => {
        const newEvent = {
          label: eventObj.event_name,
          value: eventObj,
        };
        acc.push(newEvent);
        return acc;
      }, []);
      setAllEvents(reformatEvents);
    }
    fetchData();
  }, []);

  // console.log('this is all events', allEvents);

  // event_date -- DONE
  // event_id -- DONE
  // group_image -- DONE
  // group_name -- DONE
  // group_description -- DONE
  // member_list : user's user_id
  // organizer_name : user's full name
  // size: string -- DONE
  // vibe: string -- DONE

  const submitFormData = () => {
    console.log(
      'user_id::',
      userId,
      'name:: ',
      groupName,
      'description:: ',
      groupDescription,
      'size:: ',
      size,
      'vibe:: ',
      vibe,
      'img:: ',
      groupImg,
      'event:: ',
      event,
    );
    // async function fetchData() {
    //   // console.log('here in the effect');

    //   const response = await createGroup();
    //   // await addPlan(); -- POST, PUT, DELETE
    //   // setItems(response); -- GET
    // }
    // fetchData();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>I Am Create</Text> */}
      <StatusBar style="auto" />
      <Text id="create-group" style={styles.title}>
        CREATE GROUP
      </Text>
      <Form
        onButtonPress={() => {
          submitFormData();
        }}
        buttonText="CREATE GROUP"
        buttonStyle={styles.btnStyle}
        buttonTextStyle={styles.btnTextStyle}
      >
        <FormItem
          style={styles.formInput}
          id="group-name"
          placeholder="GROUP NAME"
          isRequired
          value={groupName}
          onChangeText={(groupName) => setGroupName(groupName)}
          ref={groupNameInput}
        />
        <FormItem
          style={styles.formInput}
          id="group-description"
          placeholder="GROUP DESCRIPTION"
          isRequired
          value={groupDescription}
          onChangeText={(groupDescription) =>
            setGroupDescription(groupDescription)
          }
          ref={groupDescriptionInput}
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
          selectedValue={vibe}
          onSelection={(item) => setVibe(item.value)}
        />
        <Picker
          style={styles.formInput}
          id="select-event"
          placeholder="SELECT EVENT"
          items={allEvents}
          selectedValue={event}
          onSelection={(item) => setEvent(item.value)}
        />
        <FormItem
          style={styles.formInput}
          id="upload-img"
          placeholder="UPLOAD IMAGE"
          isRequired
          value={groupImg}
          onChangeText={(groupImg) => setGroupImg(groupImg)}
          ref={groupImgInput}
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

// event_date -- DONE
// event_id -- DONE
// group_image -- DONE
// group_name -- DONE
// group_description -- DONE
// member_list : user's user_id
// organizer_name : user's full name
// size: string -- DONE
// vibe: string -- DONE

// top priority: andrew's user id setup
// need to be able to grab user_id and name
