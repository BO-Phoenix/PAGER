import React, { useState } from 'react';
import { StyleSheet, Text, View, CheckBox } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { addUser } from '../../db/user.js';
// -- redux import statements
import { useSelector, useDispatch } from 'react-redux';
import { updateUserId } from '../../reducers/index.js';

const auth = getAuth();

const SignUpScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {

  // -- redux import statements
  const { userId } = useSelector((state) => state.pagerData);
  const dispatch = useDispatch();

  const [isOverEighteen, setIsOverEighteen] = useState(false);
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
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    description: '',
    music_tastes: [],
    error: ''
  })

  function addMusicTaste() {
    const allMusic = [];
    if (likesTechno) value.music_tastes.push('techno');
    if (likesHouse) value.music_tastes.push('house');
    if (likesTrance) value.music_tastes.push('trance');
    if (likesDubstep) value.music_tastes.push('dubstep');
    if (likesBass) value.music_tastes.push('bass');
    if (likesGrime) value.music_tastes.push('garage');
    if (likesGarage) value.music_tastes.push('grime');
    if (likesTrap) value.music_tastes.push('trap');
    if (likesDisco) value.music_tastes.push('disco');
    if (likesOther) value.music_tastes.push('other');
  }

  async function signUp() {

    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    if (!isOverEighteen) {
      setValue({
        ...value,
        error: 'You must be 18+ to make an account.'
      })
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate('Sign In');
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      })
    }

    try {
      addMusicTaste();
      console.log(value, 'value is', value.music_tastes, 'value.music tastes');
      const id = await addUser({
        email: value.email,
        password: value.password,
        first_name: value.firstName,
        last_name: value.lastName,
        birthday: '',
        music_tastes: value.music_tastes,
        group_list: [],
        friends_list: [],
        description: value.description,
        profile_pic: '',
      });
      dispatch(updateUserId(id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Signup screen</Text>

      {value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

      <View style={styles.controls}>
        <Input
          placeholder='Email'
          containerStyle={styles.control}
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
          leftIcon={<Icon
            name='envelope'
            size={16}
          />}
        />
        <Input
          placeholder='Password'
          containerStyle={styles.control}
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
          leftIcon={<Icon
            name='key'
            size={16}
          />}
        />
        <Input
          placeholder='First Name'
          containerStyle={styles.control}
          value={value.firstName}
          onChangeText={(text) => setValue({ ...value, firstName: text })}
          leftIcon={<Icon
            name='user'
            size={16}
          />}
        />
        <Input
          placeholder='Last Name'
          containerStyle={styles.control}
          value={value.lastName}
          onChangeText={(text) => setValue({ ...value, lastName: text })}
          leftIcon={<Icon
            name='user'
            size={16}
          />}
        />
        <Input
          placeholder='Description: ex (I <3 Flow Toys)'
          containerStyle={styles.control}
          value={value.description}
          onChangeText={(text) => setValue({ ...value, description: text })}
          leftIcon={<Icon
            name='newspaper-o'
            size={16}
          />}
        />
        <View style={styles.checkboxContainer}>
          <Text>I confirm that I'm 18+</Text>
          <CheckBox
            value={isOverEighteen}
            onValueChange={setIsOverEighteen}
            style={styles.checkbox}
          />
        </View>
        <Text style={styles.label}>FAVORITE GENRES</Text>
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

        <Button title="Sign up" buttonStyle={styles.control} onPress={signUp} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  controls: {
    flex: 1,
  },

  control: {
    marginTop: 10
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  }
});

export default SignUpScreen;
