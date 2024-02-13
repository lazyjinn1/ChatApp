import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [chosenBG, setChosenBG] = useState(null);

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/Background Image.png')} style={styles.imageBackground}>
        <View style={styles.subContainer}>
          <Text>Welcome!</Text>
          <TextInput
            accessible={true}
            accessibleLabel="Write your name"
            accessibleHint="Let's you choose your Screen Name for the chat app"
            accessibilityRole="input"
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder={"What's your name?"}
          />
          <Text>Choose a background color</Text>
          <View style={styles.colorChoiceContainer}>
            <TouchableOpacity
              accessible={true}
              accessibleLabel="Pink"
              accessibleHint="Let's you choose the Background color of your chat app"
              accessibilityRole="button"
              style={[styles.colorChoice, styles.colorChoice1, chosenBG === 'pink' && styles.colorChosen] }
              onPress={() => {
                setColor('pink');
                setChosenBG('pink');
              }}
            />
            <TouchableOpacity
              accessible={true}
              accessibleLabel="Dark Slate Grey"
              accessibleHint="Let's you choose the Background color of your chat app"
              accessibilityRole="button"
              style={[styles.colorChoice, styles.colorChoice2, chosenBG === 'darkslategrey' && styles.colorChosen]}
              onPress={() => {
                setColor('darkslategrey');
                setChosenBG('darkslategrey');
              }}
            />
            <TouchableOpacity
              accessible={true}
              accessibleLabel="Grey"
              accessibleHint="Let's you choose the Background color of your chat app"
              accessibilityRole="button"
              style={[styles.colorChoice, styles.colorChoice3, chosenBG === 'grey' && styles.colorChosen]}
              onPress={() => {
                setColor('grey');
                setChosenBG('grey');
              }}
            />
            <TouchableOpacity
              accessible={true}
              accessibleLabel="Light Green"
              accessibleHint="Let's you choose the Background color of your chat app"
              accessibilityRole="button"
              style={[styles.colorChoice, styles.colorChoice4, chosenBG === 'lightgreen' && styles.colorChosen]}
              onPress={() => {
                setColor('lightgreen');
                setChosenBG('lightgreen');
              }}
            />
          </View>

          <TouchableOpacity
            accessible={true}
            accessibleLabel="Go to Chat"
            accessibleHint="Let's you submit your chosen name and go to the Chat screen"
            accessibilityRole="button"
            style={styles.submitButton}
            onPress={() => {
              navigation.navigate('Chat', { name: name, color: color });
            }}
          >
            <Text>Submit Name and start Chatting!</Text>
          </TouchableOpacity>
          {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
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
    backgroundColor: 'darkslategrey',
  },
  colorChoice3: {
    backgroundColor: 'lightgrey',
  },
  colorChoice4: {
    backgroundColor: 'lightgreen',
  },
  colorChosen: {
    borderColor: 'gold',
    borderWidth: 4
  }
});

export default Start;