import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/Background Image.png')} style={styles.imageBackground}>
        <View style={styles.subContainer}>
          <Text>Welcome!</Text>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder={"What's your name?"}
          />
          <Text>Choose a background color</Text>
          <View style={styles.colorChoiceContainer}>
            <TouchableOpacity
              style={[styles.colorChoice, styles.colorChoice1]}
              onPress={() => {
                setColor('pink');
              }}
            />
            <TouchableOpacity
              style={[styles.colorChoice, styles.colorChoice2]}
              onPress={() => {
                setColor('#474056');
              }}
            />
            <TouchableOpacity
              style={[styles.colorChoice, styles.colorChoice3]}
              onPress={() => {
                setColor('#8A95A5');
              }}
            />
            <TouchableOpacity
              style={[styles.colorChoice, styles.colorChoice4]}
              onPress={() => {
                setColor('#B9C6AE');
              }}
            />
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              navigation.navigate('Chat', { name: name, color: color });
            }}
          >
            <Text>Submit Name and start Chatting!</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  subContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 15
  },

  imageBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    padding: 25,
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: '300',
    opacity: 100,
    backgroundColor: 'white'
  },
  submitButton: {
    backgroundColor: '{color}',
    borderRadius: 20,
    color: 'white',
    padding: 10,
  },

  colorChoiceContainer: {
    flexDirection: 'row',
    marginBottom: 10
  },
  colorChoice: {
    height: 75,
    width: 75,
    marginHorizontal: 10,
    marginVertical: 5,
    broderRadius: 50
  },
  colorChoice1: {
    backgroundColor: 'pink',
  },
  colorChoice2: {
    backgroundColor: '#474056',
  },
  colorChoice3: {
    backgroundColor: '#8A95A5',
  },
  colorChoice4: {
    backgroundColor: '#B9C6AE',
  },
});

export default Start;