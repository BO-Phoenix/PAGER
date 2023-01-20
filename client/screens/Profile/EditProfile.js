import React, { useEffect, useState } from 'react';
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
import { getUser } from '../../db/user';
import UserHeader from './UserHeader';
import TasteCard from './TasteCard';

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

const EditProfile = ({ route }) => {
  const userData = route.params;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [user, setUser] = useState([]);
  useEffect(() => {
    async function fetchData() {
      // const response = await getUser('QZ6KFysQsp7CG9DcicIh');
      // console.log('response: ', response);
      setUser(userData);
      setDescription(userData.description);
    }
    fetchData();
  }, []);

  return (
    <View>
      <View style={styles.bodyContainerSection}>
        <Text>SIGN OUT</Text>
      </View>
      <UserHeader user={user} />
      <View>
        <Text>Description</Text>
        <TextInput
          style={styles.description}
          onChangeText={description}
          placeholder={description}
        />
      </View>
      <Button>
        <Text>SAVE</Text>
      </Button>
    </View>
  );
};

export default EditProfile;
