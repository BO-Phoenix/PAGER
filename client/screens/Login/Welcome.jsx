import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button } from 'react-native-elements';

const image = {uri: 'https://e0.pxfuel.com/wallpapers/513/125/desktop-wallpaper-widescreen-background-furry-rave-martin-garrix.jpg'};

const WelcomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={{marginTop: 10, fontSize: 20, fontWeight: 'bold', alignSelf: 'center', color: 'white'}}>Rave Together    Stay Together</Text>
        <View style={styles.buttons}>
          <Button title="Sign in" buttonStyle={styles.button} onPress={() => navigation.navigate('Sign In')} />
          <Button title="Sign up" type="outline" buttonStyle={styles.button} onPress={() => navigation.navigate('Sign Up')} />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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