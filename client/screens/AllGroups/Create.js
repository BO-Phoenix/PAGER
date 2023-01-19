import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, SafeAreaView, ScrollView,
} from 'react-native';
import { Form, FormItem, Picker } from 'react-native-form-component';
import { useFonts } from 'expo-font';
import { useSelector } from 'react-redux';
import Loading from '../Loading/Index.js';
import {
  getGroupsPerUser,
  getGroupsAttendedPerUser,
  getGroupsUpcommingPerUser,
  createGroup,
} from '../../db/group';
import { getAllEvents } from '../../db/event';

const styles = StyleSheet.create({
  container: {
    // flex: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflowY: 'scroll',
  },
  textHeader: {
    fontSize: 24,
    paddingTop: 15,
    fontFamily: 'PoppinsBold',
  },
  separation: {
    width: '90%',
    padding: 8,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  featureHeader: {
    fontSize: 20,
    paddingTop: 15,
    fontFamily: 'PoppinsBold',
  },
  formStyle: {
    display: 'flex',
    borderTopColor: 'blue',
    borderTopWidth: 2,
    borderBottomColor: 'blue',
    borderBottomWidth: 2,
  },
  formInput: {
    // flex: 1,
    backgroundColor: '#fff',
    // border: '3px solid blue',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins',
  },
  btnStyle: {
    // flex: 1,
    backgroundColor: '#F72585',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins',
  },
  btnTextStyle: {
    fontFamily: 'Poppins',
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

  const [fontLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    Bebas: require('../../assets/fonts/BebasNeue-Regular.ttf'),
  });

  if (!fontLoaded) {
    return <Loading />;
  }

  // console.log('this is all events', allEvents);

  // event_date -- DONE
  // event_id -- DONE
  // group_image --
  // group_name -- DONE
  // group_description -- DONE
  // member_list : user's user_id -- DONE
  // organizer_name : user's user_name --get request for user info using ID
  // size: string -- DONE
  // vibe: string -- DONE

  // ** object with key/value pairs -- named the same
  // react FILE compoenent -- click a button for you to select your image

  // 1/18 AGENDA:
  // NEXT -- post form data
  // NEXT -- form upload

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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.textHeader}>GROUPS</Text>
      <View style={styles.separation} />
      <View style={{ alignSelf: 'flex-start', width: '90%', paddingLeft: 18, paddingBottom: 18 }}>
        <Text style={styles.featureHeader}>CREATE GROUP</Text>
      </View>
      <View>
        <Form
          onButtonPress={() => { submitFormData(); }}
          buttonText="CREATE GROUP"
          buttonStyle={styles.btnStyle}
          buttonTextStyle={styles.btnTextStyle}
          style={styles.formStyle}
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
            onChangeText={(groupDescription) => setGroupDescription(groupDescription)}
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
      </View>

      <StatusBar style="auto" />
    </ScrollView>
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
