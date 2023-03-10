/* eslint-disable react/style-prop-object */
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { useFonts } from 'expo-font';
import Loading from '../Loading/Index.js';
import {
  getGroupsPerUser,
  getGroupsAttendedPerUser,
  getGroupsUpcommingPerUser,
  createGroup,
} from '../../db/group';

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
  groupName: {
    fontSize: 22,
    fontFamily: 'Poppins',
  },
  groupImg: {
    height: 100,
    width: 100,
  },
  renderGroupContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: 10,
    // border: '2px solid grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    // border: '2px solid grey',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const Attended = ({ navigation }) => {
  const [attendedUserGroups, setAttendedUserGroups] = useState([]);
  const { userId } = useSelector((state) => state.pagerData);

  useEffect(() => {
    async function fetchData() {
      const response = await getGroupsAttendedPerUser('DMuiKcBDEA0q95QHzbJq');
      setAttendedUserGroups(response); // -- GET
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.textHeader}>GROUPS</Text>
      <View style={styles.separation} />
      <View style={{ alignSelf: 'flex-start', width: '90%', paddingLeft: 18 }}>
        <Text style={styles.featureHeader}>ATTENDED</Text>
      </View>
      <View style={styles.renderGroupContainer}>
        <FlatList
          data={attendedUserGroups}
          keyExtractor={(groups) => groups.id.toString()}
          contentContainerStyle={{
            width: 350,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center' /* , border: '2px solid blue' */,
          }}
          // numColumns={2}
          renderItem={({ item }) => (
            // console.log('group ID :', item.id)
            <View key={item.id} style={{ width: 350 }}>
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate('IndividualGroupsIndex', item)
                }
              >
                <View style={styles.groupContainer}>
                  <Image
                    style={styles.groupImg}
                    source={{ uri: item.group_image }}
                  />
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={styles.groupName}>{item.group_name}</Text>
                    <Text style={styles.groupName}>{item.event_name}</Text>
                  </View>

                  <Icon name="chevron-right" size={30} color="#000000" />
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}
        />
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
};

export default Attended;

// {/* <TouchableOpacity
//   title="Upcoming"
//   onPress={() => navigation.navigate('Upcoming', { name: 'Upcoming' })}
// >
//   <Text>Upcoming</Text>
// </TouchableOpacity>

// <TouchableOpacity
//   title="Create"
//   onPress={() => navigation.navigate('Create', { name: 'Create' })}
// >
//   <Text>Create</Text>
// </TouchableOpacity> */}

// {/* <Button
// title="Upcoming"
// onPress={() =>
//   navigation.navigate('Upcoming', {name: 'Upcoming'})
// } /> */}
