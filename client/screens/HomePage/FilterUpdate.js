/* eslint-disable global-require */
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  CheckBox,
} from 'react-native';
import { useFonts } from 'expo-font';
import Loading from '../Loading/Index.js';
import globalStyles from '../../globalStyles';
import emptyBox from '../../assets/box.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    overflow: 'scroll',
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 25,
    fontFamily: 'PoppinsBold',
    margin: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D9D9D9',
    margin: 10,
    padding: 10,
  },
  filter: {
    width: 150,
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: 10,
    // borderWidth: 1,
    // borderColor: 'black',
  },
  filterName: {
    fontFamily: 'PoppinsBold',
    fontSize: 15,
    marginBottom: 5,
  },
  filterOptionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterCheckbox: {
    marginRight: 5,
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

const FilterUpdate = () => {
  const [sizeSmall, setSizeSmall] = useState(false);
  const [sizeMed, setSizeMed] = useState(false);
  const [sizeLarge, setSizeLarge] = useState(false);
  const [vibeLow, setVibeLow] = useState(false);
  const [vibeMed, setVibeMed] = useState(false);
  const [vibeHigh, setVibeHigh] = useState(false);

  const [fontLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    Bebas: require('../../assets/fonts/BebasNeue-Regular.ttf'),
  });

  if (!fontLoaded) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>FILTER PREFERENCES</Text>
      <View style={styles.filterContainer}>
        <View style={styles.filter}>
          <Text style={styles.filterName}>GROUP SIZE</Text>
          <View style={styles.filterOptionContainer}>
            <CheckBox
              value={sizeSmall}
              onValueChange={setSizeSmall}
              style={styles.filterCheckbox}
            />
            <Text style={styles.filterOptions}>Small (0 - 5)</Text>
          </View>
          <View style={styles.filterOptionContainer}>
            <CheckBox
              value={sizeMed}
              onValueChange={setSizeMed}
              style={styles.filterCheckbox}
            />
            <Text style={styles.filterOptions}>Medium (6 - 10)</Text>
          </View>
          <View style={styles.filterOptionContainer}>
            <CheckBox
              value={sizeLarge}
              onValueChange={setSizeLarge}
              style={styles.filterCheckbox}
            />
            <Text style={styles.filterOptions}>Large (11 - 20)</Text>
          </View>
        </View>
        <View style={styles.filter}>
          <Text style={styles.filterName}>VIBE/ENERGY</Text>
          <View style={styles.filterOptionContainer}>
            <CheckBox
              value={vibeLow}
              onValueChange={setVibeLow}
              style={styles.filterCheckbox}
            />
            <Text style={styles.filterOptions}>Low</Text>
          </View>
          <View style={styles.filterOptionContainer}>
            <CheckBox
              value={vibeMed}
              onValueChange={setVibeMed}
              style={styles.filterCheckbox}
            />
            <Text style={styles.filterOptions}>Medium</Text>
          </View>
          <View style={styles.filterOptionContainer}>
            <CheckBox
              value={vibeHigh}
              onValueChange={setVibeHigh}
              style={styles.filterCheckbox}
            />
            <Text style={styles.filterOptions}>High</Text>
          </View>
        </View>
      </View>
      <Pressable style={styles.button}>SEARCH</Pressable>
    </View>
  );
};

export default FilterUpdate;
