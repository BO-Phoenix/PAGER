import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// -- redux import statements
import { useSelector, useDispatch } from 'react-redux';
import { updateUserId } from '../../reducers/index.js';

import globalStyles from '../../globalStyles';
import { getUserByEmail } from '../../db/user';
import gif from '../../assets/raveWelcome.gif';

const auth = getAuth();

const SignInScreen = () => {
  const { userId } = useSelector((state) => state.pagerData);
  const dispatch = useDispatch();

  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: '',
  });

  async function signIn() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.',
      });
      return;
    }

    try {
      const id = await getUserByEmail(value.email);
      // console.log('the id inside signIn is: ', id);
      dispatch(updateUserId(id));
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={gif} resizeMode="cover" style={styles.image} imageStyle={{ opacity: 0.5 }}>
        {!!value.error && (
          <View style={styles.error}>
            <Text>{value.error}</Text>
          </View>
        )}

        <View style={styles.controls}>
          <Input
            placeholder="Email"
            containerStyle={styles.control}
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
            leftIcon={<Icon name="envelope" size={16} />}
          />

          <Input
            placeholder="Password"
            containerStyle={styles.control}
            value={value.password}
            onChangeText={(text) => setValue({ ...value, password: text })}
            secureTextEntry
            leftIcon={<Icon name="key" size={16} />}
          />

          <Button
            title="Sign in"
            buttonStyle={globalStyles.button}
            onPress={signIn}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  controls: {
    flex: 1,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: 230,
    marginBottom: 230,
    paddingRight: 25,
    paddingLeft: 25,
    borderRadius: 10,
  },

  control: {
    marginTop: 10,
  },

  image: {
    flex: 1,
    justifyContent: 'center',
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  },
});

export default SignInScreen;
