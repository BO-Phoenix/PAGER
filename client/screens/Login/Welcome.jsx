import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button } from 'react-native-elements';
import globalStyles from '../../globalStyles';
import gif from '../../assets/raveWelcome.gif';

// const image = {uri: gif};

const WelcomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={gif} resizeMode="cover" style={styles.image} imageStyle={{ opacity: 0.5 }}>
        <View style={styles.buttons}>
          <Text style={styles.title}>PAGER</Text>
          <Text style={styles.slogan}>Rave Together. Stay Together.</Text>
          <Button title="Sign in" buttonStyle={globalStyles.button} onPress={() => navigation.navigate('Sign In')} />
          <Text style={styles.accountText}>Don't Have an Account?</Text>
          <Button title="Sign up" buttonStyle={globalStyles.button} onPress={() => navigation.navigate('Sign Up')} />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  title: {
    fontFamily: 'Bebas',
    fontSize: 120,
    fontWeight: 'bold',
    color: 'white',
  },

  slogan: {
    marginTop: -10,
    fontFamily: 'Bebas',
    fontSize: 22,
    fontWeight: 'thin',
    alignSelf: 'center',
    color: 'white',
  },

  accountText: {
    marginTop: 30,
    fontFamily: 'Bebas',
    fontSize: 20,
    fontWeight: 'thin',
    alignSelf: 'center',
    color: 'white',
  },

  buttons: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },

  image: {
    flex: 1,
    justifyContent: 'center',
  },

  button: {
    marginTop: 10
  }
});

export default WelcomeScreen;