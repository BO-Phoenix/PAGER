import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Form, FormItem, Picker } from 'react-native-form-component';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Arial',
    fontWeight: 'medium',
    fontSize: '24px',
  },
  formInput: {
    flex: 1,
    backgroundColor: '#fff',
    // border: '3px solid blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStyle: {
    flex: 1,
    backgroundColor: '#F72585',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTextStyle: {
    fontFamily: 'Arial',
    fontWeight: 'light',
    fontSize: '18px',
  }
});

const Create = () => {
  const [size, setSize] = useState('');
  const [vibe, setVibe] = useState('');

  return (
    <View style={styles.container}>
      {/* <Text>I Am Create</Text> */}
      <StatusBar style="auto" />

      <Text id="create-group" style={styles.title}>CREATE GROUP</Text>
      <Form
        onButtonPress={() => console.warn('do something')}
        buttonText="CREATE GROUP"
        buttonStyle={styles.btnStyle}
        buttonTextStyle={styles.btnTextStyle}
      >
        <FormItem style={styles.formInput}
          id="group-name"
          placeholder="GROUP NAME"
          isRequired
        />
        <FormItem style={styles.formInput}
          id="group-description"
          placeholder="GROUP DESCRIPTION"
          isRequired
        />
        <Picker style={styles.formInput}
          id="select-size"
          placeholder="SELECT SIZE"
          items={[
          { label: 'Small (0-5)', value: 'small' },
          { label: 'Medium (6-10)', value: 'medium' },
          { label: 'Large (11-20)', value: 'large' },
          ]}
          // label="Pick a number"
          selectedValue={size}
          onSelection={(item) => setSize(item.value)}
        />
        <Picker style={styles.formInput}
          id="select-vibe"
          placeholder="SELECT VIBE"
          items={[
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' },
          ]}
          // label="Pick a number"
          selectedValue={vibe}
          onSelection={(item) => setVibe(item.value)}
        />
        <FormItem style={styles.formInput}
          id="upload-img"
          placeholder="UPLOAD IMAGE"
          isRequired
        />
      </Form>
        {/* <form id="create-group-form" onSubmit={handleSubmit}>
          <input id="group-name" type="text" placeholder="GROUP NAME" name="group-name" />

          <input id="group-description" type="text" placeholder="GROUP DESCRIPTION" name="group-description" />

          <select id="select-size" name="select-size" >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>

          <select id="select-vibe" name="select-vibe" >
            <option value="small">Low</option>
            <option value="medium">Medium</option>
            <option value="large">High</option>
          </select>

          <input id="upload-photo" type="text" name="upload-photo" />

          <button className="create-group-btn" type="submit">CREATE GROUP</button>
        </form> */}
    </View>
  );
};

export default Create;