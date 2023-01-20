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
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
  },
  input: {
    borderwidth: 2,
    borderColor: '#000000',
    padding: 8,
    margin: 10,
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
  },

  checkboxContainer: {
    flexBasis: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  checkbox: {
    alignSelf: 'center',
    marginTop: -15,
    marginLeft: -150,
  },
  buttonText: {
    fontFamily: 'PoppinsBold',
    color: 'white',
  },
  description: {},
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
    <View>
      {/* <View style={styles.bodyContainerSection}>
        <Text>SIGN OUT</Text>
      </View> */}
      <UserHeader user={user} />
      <Text>Edit Description:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(val) => setDescription(val)}
        placeholder={placeholdertext}
      />
      {/* <View>{description}</View> */}
      {/* <View>{userId}</View> */}
      {/* <Input></Input> */}

      <Text style={styles.label}>FAVORITE GENRES</Text>
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
