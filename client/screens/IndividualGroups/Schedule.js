/* eslint-disable global-require */
/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { Input } from 'react-native-elements';
import { useFonts } from 'expo-font';
import DatePicker from 'react-native-date-picker';
import globalStyles from '../../globalStyles';
import { getGroupPlans } from '../../db/group.js';
import Loading from '../Loading/Index';

const Schedule = ({ navigation }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      overflowY: 'scroll',
      height: '100%',
    },
    group: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    main: { height: 50, width: 50 },
    name: {
      fontSize: 30,
      margin: 'auto',
      marginLeft: 10,
      fontFamily: 'PoppinsBold',
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
      // borderWidth: 2},
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalInput: {
      alignItems: 'center',
      width: '100%',
    },
  });

  // bold specific words
  // eslint-disable-next-line react/no-unstable-nested-components
  const B = ({ children }) => (
    <Text style={{ fontWeight: '900' }}>{children}</Text>
  );

  // use states
  const [modalVisible, setModalVisible] = useState(false);
  const [plans, setPlans] = useState([]);
  const [date, setDate] = useState(new Date());
  const [value, setValue] = useState({
    description: '',
    error: '',
  });

  // load data
  useEffect(() => {
    async function fetchData() {
      const resPlans = await getGroupPlans('IrIfBilvP6HSrCHzty9d');
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

  // add schedule handler
  async function addSchedule() {
    if (value.time === '' || value.description === '') {
      setValue({ ...value, error: 'Please input time AND description!' });
      return;
    }

    try {
      // function to add time and description to database
    } catch (err) {
      setValue({ ...value, error: err.message });
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* modal container */}
              <Text style={styles.modalText}>
                Add plan to schedule modal
                {/* <Input
                  placeholder="Time"
                  containerStyle={styles.modalInput}
                  value={value.time}
                  onChangeText={(text) => setValue({ ...value, time: text })}
                /> */}
                {/* WANT TO INCORPORATE DAT EPICKER */}
                {/* <DatePicker date={date} onDateChange={setDate} /> */}
                <Input
                  placeholder="Description"
                  containerStyle={styles.modalInput}
                  value={value.description}
                  onChangeText={(text) =>
                    setValue({ ...value, description: text })
                  }
                />
              </Text>
              <TouchableOpacity
                title="AddPlan"
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'PoppinsBold',
                    marginTop: 0,
                    marginRight: 5,
                  }}
                >
                  X
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.group}>
          <Image
            style={styles.main}
            source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          />
          <Text style={styles.name}>Group Name</Text>
        </View>

        <View style={styles.separation} />
        <View style={styles.schedule}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'PoppinsBold',
              margin: 'auto',
              height: 20,
            }}
          >
            SCHEDULE
          </Text>
          <TouchableOpacity
            title="AddPlan"
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'PoppinsBold',
                marginTop: 0,
                marginRight: 5,
              }}
            >
              +
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
          {plans
            .sort((a, b) => a.time.seconds - b.time.seconds)
            .map((plan) => {
              let date = new Date(plan.time.seconds);
              // let date = 'Tue Jan 20 1970 13:01:242424';
              date += 'string';
              date = date.slice(16, 21);
              const num = date.slice(0, 2);
              if (num > 12) {
                date = spliceSlice(date, 0, 2, num - 12);
                date += ' PM';
              } else {
                date += ' AM';
              }
              return (
                <View style={styles.schedules} key={plan.id}>
                  <B>{plan.time.seconds ? date : plan.time.seconds}</B>
                  <Text>{plan.description}</Text>
                </View>
              );
            })}
        </View>
      </View>
    </ScrollView>
  );
};

export default Schedule;
