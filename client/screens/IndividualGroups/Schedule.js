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
} from 'react-native';
import globalStyles from '../../globalStyles';
import { getGroupPlans } from '../../db/group.js';

const Chat = ({ navigation }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      overflowY: 'scroll',
    },
    main: { height: 50, width: 50 },
    name: { fontSize: 45 },
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
  });

  // bold specific words
  // eslint-disable-next-line react/no-unstable-nested-components
  const B = ({ children }) => (
    <Text style={{ fontWeight: '900' }}>{children}</Text>
  );

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resPlans = await getGroupPlans('IrIfBilvP6HSrCHzty9d');
      setPlans(resPlans);
    }
    fetchData();
  }, []);

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
        <Image
          style={styles.main}
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        />
        <Text style={styles.name}>GroupName</Text>

        <View style={styles.separation} />
        <View style={styles.schedule}>
          <Text style={{ fontSize: 20 }}>
            <B>SCHEDULE</B>
          </Text>
          <TouchableOpacity
            title="AddPlan"
            onPress={() => console.log('create modal to add plans')}
          >
            <Text style={{ fontSize: 20 }}>+</Text>

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
                  <View style={styles.schedules} key={plan.id}>
                    <B>{plan.time.seconds ? date : plan.time.seconds}</B>
                    <Text>{plan.description}</Text>
                  </View>
                );
              })}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Chat;
