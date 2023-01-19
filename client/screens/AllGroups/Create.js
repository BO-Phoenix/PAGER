/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/style-prop-object */
import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, SafeAreaView, ScrollView,
} from 'react-native';
import { Form, FormItem, Picker, Modal, Label } from 'react-native-form-component';
import { useFonts } from 'expo-font';
import { useSelector } from 'react-redux';
import * as DocumentPicker from 'expo-document-picker';
import Loading from '../Loading/Index.js';
import {
  getGroupsPerUser,
  getGroupsAttendedPerUser,
  getGroupsUpcommingPerUser,
  createGroup,
} from '../../db/group';
import { getAllEvents } from '../../db/event';
import { getUser } from '../../db/user';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  formStyle1: {
    display: 'flex',
    // borderWidth: 2,
    // borderColor: 'blue',
    margin: 0,
  },
  formStyle2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: 'red',
    margin: 0,
  },
  formInput: {
    // flex: 1,
    backgroundColor: '#fff',
    // border: '3px solid blue',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins',
  },
  btnStyleSubmit: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: '#F72585',
    fontFamily: 'PoppinsBold',
    color: 'white',
    borderRadius: 0,
  },
  btnTextStyleSubmit: {
    fontFamily: 'PoppinsBold',
    color: 'white',
  },
  btnStyleUpload: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: '#4895EF',
    fontFamily: 'PoppinsBold',
    color: 'white',
    borderRadius: 0,
  },
  btnTextStyleUpload: {
    fontFamily: 'PoppinsBold',
    color: 'white',
    fontSize: 14,
  },
});

const Create = () => {
  const [userData, setUserData] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupImg, setGroupImg] = useState('');
  const [size, setSize] = useState('');
  const [vibe, setVibe] = useState('');
  const [event, setEvent] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [allEvents, setAllEvents] = useState([]);
  const { userId } = useSelector((state) => state.pagerData);

  const groupNameInput = useRef();
  const groupDescriptionInput = useRef();
  const groupImgInput = useRef();

  useEffect(() => {
    async function fetchData() {
      const response = await getAllEvents();
      const userData = await getUser(userId);
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
      setUserData(userData);
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

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    // console.log('image upload : ', result);
    setGroupImg(result);
  };

  // -- 1/19 fix group image upload
  const submitFormData = () => {
    const newGroupFormData = {
      event_date: event.event_date,
      event_id: event.id,
      group_description: groupDescription,
      group_image: groupImg,
      group_name: groupName,
      member_list: [userId],
      organizer_id: userId,
      organizer_name: userData[0].first_name,
      size,
      vibe,
    };
    createGroup(newGroupFormData, userId);
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
          buttonStyle={styles.btnStyleSubmit}
          buttonTextStyle={styles.btnTextStyleSubmit}
          style={styles.formStyle1}
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
          <Form
            onButtonPress={() => { pickDocument(); }}
            buttonText="UPLOAD IMAGE"
            buttonStyle={styles.btnStyleUpload}
            buttonTextStyle={styles.btnTextStyleUpload}
            style={styles.formStyle2}
          />
        </Form>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
};

export default Create;

// event_date -- DONE
// event_id -- DONE
// group_image -- DONE
// group_name -- DONE
// group_description -- DONE
// member_list : user's user_id -- DONE ARRAY
// organizer_id : user's user_id -- DONE
// organizer_name : user's user_name --get request for user info using ID -- DONE
// size: string -- DONE
// vibe: string -- DONE

// ** object with key/value pairs -- named the same
// react FILE compoenent -- click a button for you to select your image
