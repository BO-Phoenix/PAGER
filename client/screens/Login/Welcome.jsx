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
        <Text style={{marginTop: 10, fontSize: 20, fontWeight: 'bold', alignSelf: 'center', color: 'white'}}>Rave Together    Stay Together</Text>
        <View style={styles.buttons}>
          <Button title="Sign in" buttonStyle={globalStyles.button} onPress={() => navigation.navigate('Sign In')} />
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

  buttons: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'end',
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