/* eslint-disable global-require */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import { useFonts } from 'expo-font';
import { useSelector } from 'react-redux';
import { Form, FormItem, Picker } from 'react-native-form-component';
import Loading from '../Loading/Index.js';
import SwipeCard from './SwipeCard.js';
import globalStyles from '../../globalStyles';
import bgImage from '../../assets/swipebg.png';
import { getGroupsPerEvent, sendRequestToGroup } from '../../db/group.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bodyContainerSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    paddingVertical: 0,
    paddingHorizontal: 20,
    marginVertical: 0,
  },
  textTitle: {
    fontSize: 20,
    fontFamily: 'PoppinsBold',
  },
  formInput: {
    width: 100,
    flex: 1,
    backgroundColor: '#fff',
    color: 'black',
    border: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

const Swipe = ({ route, navigation }) => {
  const { userId } = useSelector((state) => state.pagerData);
  const [size, setSize] = useState('ALL');
  const [vibe, setVibe] = useState('ALL');
  const [allGroups, setAllGroups] = useState([]);
  const [vibeGroups, setVibeGroups] = useState([]);
  const [sizeGroups, setSizeGroups] = useState([]);

  const [groups, setGroups] = useState([]);

  const screenWidth = Dimensions.get('window').width * 0.9;
  const screenHeight = Dimensions.get('window').height * 0.75;
  const outOfScreen =
    Dimensions.get('window').width + 0.5 * Dimensions.get('window').width;
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;

  // useEffect(() => {
  //   if (!groups.length) {
  //     setGroups(groupsArray);
  //   }
  // }, [groups.length]);

  useEffect(() => {
    async function fetchData() {
      const group_list = await getGroupsPerEvent(route.params.id);
      setGroups(group_list);
      setAllGroups(group_list);
      setVibeGroups(group_list);
      setSizeGroups(group_list);
      // console.log('current group is : ', currentGroup);
    }
    fetchData();
  }, []);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy, y0 }) => {
      swipe.setValue({ x: dx, y: dy });
      tiltSign.setValue(y0 > screenHeight / 2 ? 1 : -1);
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > 100;

      if (isActionActive) {
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: direction * outOfScreen,
            y: dy,
          },
          useNativeDriver: true,
          // eslint-disable-next-line no-use-before-define
        }).start(removeTopCard);
      } else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const removeTopCard = useCallback(() => {
    setGroups((prevState) => prevState.slice(1));
    console.log('the top one is : ', groups);
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  const [fontLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontLoaded) {
    return <Loading />;
  }
  const handleSelection = (item, criteria) => {
    const vibe_groups = [];
    const size_groups = [];
    if (criteria === 'vibe') {
      console.log('select vibe');
      setVibe(item.value);
      if (item.value === 'all') {
        setGroups(allGroups);
      } else {
        allGroups.forEach((group) => {
          if (group.vibe.toLowerCase() === item.value.toLowerCase()) {
            console.log('group is vibe :', item.value, group.group_name);
            vibe_groups.push(group);
          }
        });
        setGroups(vibe_groups);
      }
    } else {
      console.log('select vibe');
      setSize(item.value);
      if (item.value === 'all') {
        setGroups(allGroups);
      } else {
        allGroups.forEach((group) => {
          if (group.size.toLowerCase() === item.value.toLowerCase()) {
            console.log('group is size :', item.value, group.group_name);
            size_groups.push(group);
          }
        });
        setGroups(size_groups);
      }
    }
  };

  const handleSelectionNew = (item, criteria) => {
    const vibe_groups = [];
    const size_groups = [];
    if (criteria === 'vibe') {
      console.log('select vibe');
      setVibe(item.value);
      if (item.value === 'all') {
        setGroups(allGroups);
      } else {
        allGroups.forEach((group) => {
          if (group.vibe.toLowerCase() === item.value.toLowerCase()) {
            console.log('group is vibe :', item.value, group.group_name);
            vibe_groups.push(group);
          }
        });
        console.log('vibe group should only have one: ', vibe_groups);
        setVibeGroups(vibe_groups);
        const result = vibe_groups.filter((x) => sizeGroups.includes(x));
        console.log('vibe intersection is : ', vibe_groups, sizeGroups, result);
        setGroups(result);
      }
    } else {
      console.log('select size');
      setSize(item.value);
      if (item.value === 'all') {
        setGroups(allGroups);
      } else {
        allGroups.forEach((group) => {
          if (group.size.toLowerCase() === item.value.toLowerCase()) {
            console.log('group is size :', item.value, group.group_name);
            size_groups.push(group);
          }
        });
        console.log('size group should only have one: ', size_groups);
        setSizeGroups(size_groups);
        const result = size_groups.filter((x) => vibeGroups.includes(x));
        console.log('size intersection is : ', vibeGroups, size_groups, result);
        setGroups(result);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} resizeMode="cover" style={styles.image}>
        <View style={styles.bodyContainerSection}>
          <Picker
            style={{ height: 3, width: 125 }}
            id="select-size"
            placeholder="ENERGY/VIBE"
            items={[
              // { label: 'ALL', value: 'all' },
              { label: 'LOW', value: 'low' },
              { label: 'MEDIUM', value: 'medium' },
              { label: 'HIGH', value: 'high' },
            ]}
            selectedValue={vibe}
            onSelection={(item) => handleSelectionNew(item, 'vibe')}
          />
          <Picker
            style={{ height: 30, width: 125 }}
            id="select-size"
            placeholder="GROUP SIZE"
            items={[
              // { label: 'ALL', value: 'all' },
              { label: 'SMALL (0-5)', value: 'small' },
              { label: 'MEDIUM (6-10)', value: 'medium' },
              { label: 'LARGE (11-20)', value: 'large' },
            ]}
            selectedValue={size}
            onSelection={(item) => handleSelectionNew(item, 'size')}
          />
        </View>
        {!!groups &&
          groups
            .map((group, index) => {
              const isFirst = index === 0;
              const dragHandlers = isFirst ? panResponder.panHandlers : {};
              return (
                <SwipeCard
                  key={group.group_name}
                  name={group.group_name}
                  description={group.group_description}
                  source={group.group_image}
                  isFirst={isFirst}
                  swipe={swipe}
                  tiltSign={tiltSign}
                  group_id={group.id}
                  nav={navigation}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...dragHandlers}
                />
              );
            })
            .reverse()}
      </ImageBackground>
    </View>
  );
};

export default Swipe;
