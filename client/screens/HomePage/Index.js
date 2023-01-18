/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  CheckBox,
  FlatList,
} from 'react-native';
import { useFonts } from 'expo-font';
import Loading from '../Loading/Index.js';
import globalStyles from '../../globalStyles';
import emptyBox from '../../assets/box.png';
import { getAllEvents } from '../../db/event.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 10,
    overflow: 'scroll',
    backgroundColor: 'white',
    // borderWidth: 3,
    // borderColor: 'red',
  },
  headerText: {
    fontSize: 25,
    fontFamily: 'PoppinsBold',
    margin: 10,
  },
  filterContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 10,
    paddingBottom: 200,
    // borderWidth: 3,
    // borderColor: 'green',
  },
  filterOptionContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    // borderWidth: 1,
    // borderColor: 'black',
    marginBottom: 15,
  },
  filterImage: {
    width: 230,
    height: 230,
    borderRadius: 10,
  },
  filterName: {
    fontFamily: 'PoppinsBold',
    fontSize: 15,
  },
  filterOptions: {
    fontFamily: 'Poppins',
    fontSize: 15,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: '#F72585',
    fontFamily: 'PoppinsBold',
    color: 'white',
    margin: 10,
  },
});

const Index = () => {
  const [fontLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    Bebas: require('../../assets/fonts/BebasNeue-Regular.ttf'),
  });

  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const events_list = await getAllEvents();
      setEvents(events_list);
    }
    fetchData();
  }, []);

  if (!fontLoaded) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>SELECT EVENT</Text>
      <View style={styles.filterContainer}>
        <FlatList
          data={events}
          keyExtractor={(events) => events.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            // console.log('date is :',item.event_date)
            <View style={styles.filterOptionContainer}>
              <Image
                style={styles.filterImage}
                source={{ uri: item.event_image }}
              />
              <Text style={styles.filterName}>{item.event_name}</Text>
              <Text style={styles.filterOptions}>{item.event_location}</Text>
              <Text style={styles.filterOptions}>
                {new Date(item.event_date.seconds * 1000).toDateString()}
              </Text>
            </View>
          )}
        />
        {/* <View style={styles.filterOptionContainer}>
          <Image
            style={styles.filterImage}
            source={require('../../assets/box.png')}
          />
          <Text style={styles.filterName}>EVENT NAME</Text>
          <Text style={styles.filterOptions}>Location</Text>
          <Text style={styles.filterOptions}>Date</Text>
        </View>
        <View style={styles.filterOptionContainer}>
          <Image
            style={styles.filterImage}
            source={require('../../assets/box.png')}
          />
          <Text style={styles.filterName}>EVENT NAME</Text>
          <Text style={styles.filterOptions}>Location</Text>
          <Text style={styles.filterOptions}>Date</Text>
        </View>
        <View style={styles.filterOptionContainer}>
          <Image
            style={styles.filterImage}
            source={require('../../assets/box.png')}
          />
          <Text style={styles.filterName}>EVENT NAME</Text>
          <Text style={styles.filterOptions}>Location</Text>
          <Text style={styles.filterOptions}>Date</Text>
        </View> */}
      </View>
    </View>
  );
};

export default Index;
