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
} from 'react-native';
import { useFonts } from 'expo-font';
import Loading from '../Loading/Index.js';
import SwipeCard from './SwipeCard.js';
import globalStyles from '../../globalStyles';
import emptyBox from '../../assets/box.png';
import { getGroupsPerEvent, sendRequestToGroup } from '../../db/group.js';
import { useSelector } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

const Swipe = ({ route, navigation }) => {
  const { userId } = useSelector((state) => state.pagerData);
  // const groupsArray = [
  //   {
  //     id: '1',
  //     source: require('../../assets/test.gif'),
  //     name: 'Name',
  //     description:
  //       'blah b sdf dsf ds fds fds fds f ds fds f ds fds f ds fds f dsf ds  dsflah balhb albh',
  //   },
  //   {
  //     id: '2',
  //     source: require('../../assets/test.gif'),
  //     name: 'Test',
  //     description: 'blah blah balhb albh',
  //   },
  //   {
  //     id: '3',
  //     source: require('../../assets/test.gif'),
  //     name: 'Ug',
  //     description: 'blah blah balhb albh',
  //   },
  //   {
  //     id: '4',
  //     source: require('../../assets/test.gif'),
  //     name: 'Ly',
  //     description: 'blah blah balhb albh',
  //   },
  //   {
  //     id: '5',
  //     source: require('../../assets/box.png'),
  //     name: 'Boy',
  //     description: 'blah blah balhb albh',
  //   },
  // ];

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
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  const [fontLoaded] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontLoaded) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {!!groups &&
        groups
          .map((group, index) => {
            const isFirst = index === 0;
            const dragHandlers = isFirst ? panResponder.panHandlers : {};
            return (
              <>
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
              </>
            );
          })
          .reverse()}
      {/* <SwipeFooter /> */}
    </View>
  );
};

export default Swipe;
