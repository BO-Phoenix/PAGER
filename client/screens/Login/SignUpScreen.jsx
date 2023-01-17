import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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

  const [userDocId, setUserDocId] = useState('');
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    error: ''
  })

  async function signUp() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
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
      const id = await addUser({
        email: value.email,
        password: value.password,
        first_name: value.firstName,
        last_name: value.lastName,
        birthday: '',
        music_tastes: [],
        group_list: [],
        friends_list: [],
        description: '',
        profile_pic: '',
      });
      dispatch(updateUserId(id));
      setUserDocId(id);
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
    alignItems: 'center',
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
