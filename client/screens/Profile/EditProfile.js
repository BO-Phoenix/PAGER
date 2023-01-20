import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  StyleSheet,
  Item,
  TextInput,
  Text,
  View,
  Image,
  Pressable,
  CheckBox,
  Alert,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import { editUserData } from '../../db/user';
import UserHeader from './UserHeader';
import TasteCard from './TasteCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 10,
    overflow: 'scroll',
    // overflow-x: 'hidden',
    backgroundColor: 'white',
    // borderWidth: 3,
    // borderColor: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000000',
    padding: 8,
    margin: 10,
    width: '80%',
    // height: 40,
    // margin: 12,
    // borderWidth: 1,
    // padding: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 32,
    backgroundColor: '#F72585',
    fontFamily: 'PoppinsBold',
    color: 'white',
    marginBottom: 5,
  },
  allCheckboxContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginLeft: 100,
    maxHeight: '10em',
    marginBottom: 15,
  },

  checkboxContainer: {
    flexBasis: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  checkbox: {
    alignSelf: 'center',
    marginTop: -15,
    marginLeft: -190,
  },
  buttonText: {
    fontFamily: 'PoppinsBold',
    color: 'white',
  },
  bodyContainerName: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 10,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  headerImage: {
    width: 75,
    height: 75,
    marginRight: 15,
    marginBottom: 15,
  },
  headerName: {
    fontSize: 20,
    fontFamily: 'PoppinsBold',
  },
  textDetailBold: {
    fontSize: 15,
    fontFamily: 'PoppinsBold',
  },
});

const EditProfile = ({ route }) => {
  // console.log(route.params.user.description);
  const [likesTechno, setLikesTechno] = useState(false);
  const [likesHouse, setLikesHouse] = useState(false);
  const [likesTrance, setLikesTrance] = useState(false);
  const [likesDubstep, setLikesDubstep] = useState(false);
  const [likesBass, setLikesBass] = useState(false);
  const [likesGrime, setLikesGrime] = useState(false);
  const [likesGarage, setLikesGarage] = useState(false);
  const [likesTrap, setLikesTrap] = useState(false);
  const [likesDisco, setLikesDisco] = useState(false);
  const [likesOther, setLikesOther] = useState(false);
  const userData = route.params.user;
  const { userId } = useSelector((state) => state.pagerData);
  const [description, setDescription] = useState('');
  const [user, setUser] = useState([]);
  const [placeholdertext, setPlaceholdertext] = useState('');
  useEffect(() => {
    // const response = await getUser('QZ6KFysQsp7CG9DcicIh');
    // console.log('response: ', response);
    setUser(userData);
    // console.log(route.params.user.description);
    setPlaceholdertext(route.params.user.description);
    // console.log('useffect');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainerName}>
        <Image style={styles.headerImage} source={user.profile_pic} />
        <Text style={styles.headerName}>
          {user.first_name}
          {' '}
          {user.last_name}
        </Text>
      </View>
      <Text style={styles.textDetailBold}>EDIT DESCRIPTION:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(val) => setDescription(val)}
        placeholder="Update description here."
      />


      <Text style={styles.textDetailBold}>FAVORITE GENRES:</Text>
      <View style={styles.allCheckboxContainer}>
        <View style={styles.checkboxContainer}>
          <Text>Techno</Text>
          <CheckBox
            value={likesTechno}
            onValueChange={setLikesTechno}
            style={styles.checkbox}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Text>House</Text>
          <CheckBox
            value={likesHouse}
            onValueChange={setLikesHouse}
            style={styles.checkbox}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Text>Trance</Text>
          <CheckBox
            value={likesTrance}
            onValueChange={setLikesTrance}
            style={styles.checkbox}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Text>Dubstep</Text>
          <CheckBox
            value={likesDubstep}
            onValueChange={setLikesDubstep}
            style={styles.checkbox}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Text>Bass</Text>
          <CheckBox
            value={likesBass}
            onValueChange={setLikesBass}
            style={styles.checkbox}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Text>Grime</Text>
          <CheckBox
            value={likesGrime}
            onValueChange={setLikesGrime}
            style={styles.checkbox}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Text>Garage</Text>
          <CheckBox
            value={likesGarage}
            onValueChange={setLikesGarage}
            style={styles.checkbox}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Text>Trap</Text>
          <CheckBox
            value={likesTrap}
            onValueChange={setLikesTrap}
            style={styles.checkbox}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Text>Disco</Text>
          <CheckBox
            value={likesDisco}
            onValueChange={setLikesDisco}
            style={styles.checkbox}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Text>Other</Text>
          <CheckBox
            value={likesOther}
            onValueChange={setLikesOther}
            style={styles.checkbox}
          />
        </View>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => {
          // console.log(description);
          setPlaceholdertext('');
          editUserData(userId, description);
          route.params.onEdit(description);
        }}
      >
        <Text style={styles.buttonText}>SAVE CHANGES</Text>
      </Pressable>
    </View>
  );
};

export default EditProfile;
