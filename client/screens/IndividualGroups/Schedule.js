/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-underscore-dangle */
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
import DatePicker from 'react-native-datepicker';
import globalStyles from '../../globalStyles';
import { getGroupPlans, addPlan, deletePlan } from '../../db/group.js';
import Loading from '../Loading/Index';

const Schedule = ({ navigation, groupData }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      height: '100%',
    },
    group: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    main: { height: 60, width: 60 },
    name: {
      fontSize: 40,
      marginVertical: 'auto',
      alignItems: 'center',
      marginLeft: 20,
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
      width: '100%',
      fontFamily: 'PoppinsBold',
      alignItems: 'center',
    },
    schedules: {
      marginTop: 20,
      alignSelf: 'start',
      padding: 5,
      width: '100%',
      // borderWidth: 2},
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
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      // margin: 20,
      // borderRadius: 20,
      position: 'absolute',
      width: '100%',
      bottom: 150,
      backgroundColor: 'white',
      padding: 35,
      // alignItems: 'center',r
      shadowColor: '#000',
      height: '55%',
      opacity: 0.99,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.8,
      shadowRadius: 50,
      elevation: 5,
    },
    modalInput: {
      // alignItems: 'center',
      width: '100%',
    },
    closeModal: {
      alignSelf: 'end',
    },
    error: {
      marginTop: 10,
      padding: 10,
      color: '#fff',
      backgroundColor: '#D54826FF',
    },
  });

  // use states
  const [modalVisible, setModalVisible] = useState(false);
  const [plans, setPlans] = useState([]);
  const [date, setDate] = useState('12:00 AM');
  const [value, setValue] = useState({
    time: '1674000000000',
    description: '',
    error: '',
  });
  // get data on load
  useEffect(() => {
    async function fetchData() {
      const resPlans = await getGroupPlans(groupData.id);
      setPlans(resPlans);
    }
    fetchData();
  }, []);

  // get data function
  async function fetchData() {
    const resPlans = await getGroupPlans(groupData.id);
    setPlans(resPlans);
  }

  // load font
  const [fontLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    Bebas: require('../../assets/fonts/BebasNeue-Regular.ttf'),
  });

  if (!fontLoaded) {
    return <Loading />;
  }

  // splice strings
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
      setValue({ ...value, error: 'Input time AND description' });
      return;
    }

    try {
      // function to add time and description to database
      addPlan(groupData.id, {
        time: Number(value.time),
        description: value.description,
      });
      fetchData();
      setValue({ description: '', time: '' });
      setModalVisible(!modalVisible);
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
              <View style={styles.modalText}>
                <TouchableOpacity
                  title="CloseModal"
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      fontSize: 20,
                      fontFamily: 'PoppinsBold',
                      marginTop: 0,
                      marginRight: 5,
                    }}
                  >
                    X
                  </Text>
                </TouchableOpacity>
                <DatePicker
                  style={{ width: 200 }}
                  date={date}
                  mode="time"
                  androidMode="spinner"
                  placeholder="select time"
                  format="h:mm a"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  getDateStr="true"
                  onDateChange={(date) => {
                    let hr = Number(date.split(':')[0]);
                    let min = Number(date.split(':')[1].slice(0, 2));
                    const a = date.split(' ')[1];
                    if (a === 'am') {
                      min *= 60;
                      if (hr === 12) {
                        hr = 0;
                        hr += min;
                        hr = JSON.stringify(hr);
                        while (hr.length < 5) {
                          hr = `0${hr}`;
                        }
                      } else {
                        hr *= 3600;
                        hr += min;
                      }
                    } else {
                      min *= 60;
                      if (hr === 12) {
                        hr = 43200;
                        hr += min;
                      } else {
                        hr *= 3600;
                        hr += 43200;
                        hr += min;
                      }
                    }
                    const now = `16740${hr}000`;
                    console.log('a: ', a);
                    console.log('now: ', now);
                    const str = '16740';
                    console.log(date);
                    setDate(date);
                    setValue({ ...value, time: now });
                  }}
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: { marginLeft: 36, color: 'black' },
                    datePicker: {
                      backgroundColor: 'black',
                    },
                    datePickerCon: {
                      backgroundColor: 'black',
                    },
                  }}
                />
                <Input
                  placeholder="Description"
                  containerStyle={styles.modalInput}
                  onChangeText={(text) =>
                    setValue({ ...value, description: text })
                  }
                />
              </View>
              <TouchableOpacity
                title="AddPlan"
                onPress={() => {
                  addSchedule();
                }}
              >
                <Text
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 12,
                    paddingHorizontal: 32,
                    backgroundColor: '#F72585',
                    fontFamily: 'PoppinsBold',
                    color: 'white',
                    margin: 10,
                  }}
                >
                  ADD SCHEDULE
                </Text>
              </TouchableOpacity>
              {!!value.error && (
                <View style={styles.error}>
                  <Text>{value.error}</Text>
                </View>
              )}
            </View>
          </View>
        </Modal>
        <View style={styles.group}>
          <Image style={styles.main} source={{ uri: groupData.group_image }} />
          <Text style={styles.name}>{groupData.group_name}</Text>
        </View>

        <View style={styles.separation} />
        <View style={styles.schedule}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'PoppinsBold',
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
                fontSize: 30,
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
            .sort((a, b) => a.time - b.time)
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
                <View
                  style={styles.schedules}
                  key={plan.id}
                  value={plan.id}
                  name={plan.id}
                >
                  <Text style={styles.boldDesc}>{date}</Text>
                  <TouchableOpacity
                    title="DeletePlan"
                    onPress={
                      (e) => {
                        deletePlan(
                          groupData.id,
                          e.target._internalFiberInstanceHandleDEV.memoizedProps
                            .value,
                        );

                        fetchData();
                      }
                      // console.log(
                      //   e.target._internalFiberInstanceHandleDEV.memoizedProps
                      //     .value)
                    }
                  >
                    <Text
                      value={plan.id}
                      name={plan.id}
                      style={{
                        position: 'absolute',
                        right: 0,
                        fontSize: 30,
                        fontFamily: 'PoppinsBold',
                        marginTop: 0,
                        marginRight: 5,
                      }}
                    >
                      X
                    </Text>
                  </TouchableOpacity>
                  <Text styles={styles.desc}>{plan.description}</Text>
                </View>
              );
            })}
        </View>
      </View>
    </ScrollView>
  );
};

export default Schedule;
