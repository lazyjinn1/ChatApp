import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { getAuth, signInAnonymously } from 'firebase/auth';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [BGcolor, setBGColor] = useState('pink');
  const [leftColor, setLeftColor] = useState(null);
  const [rightColor, setRightColor] = useState(null);
  const [chatroom, setChatroom] = useState('General');

  // getAuth is for our Anonymous authentication
  const auth = getAuth();

  // when the button is clicked, the user is "signed on" with their temporary account
  const signInUser = () => {
    if (!name || !chatroom) {
      Alert.alert('Please enter a name and choose a chatroom');
      return;
    }

    signInAnonymously(auth)
      .then(result => {
        navigation.navigate('Chat', { userID: result.user.uid, name, BGcolor, leftColor, rightColor, chatroom });
      })
      .catch(() => {
        Alert.alert('Unable to sign in, try again later.');
      });
  };

  const selectOption = (selectedBGColor, leftColor, rightColor, selectedChatroom) => {
    setBGColor(selectedBGColor);
    setLeftColor(leftColor);
    setRightColor(rightColor);
    setChatroom(selectedChatroom);
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', 'white']}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text>Welcome!</Text>
          <TextInput
            accessible={true}
            accessibleLabel="Write your name"
            accessibleHint="Let's you choose your Screen Name for the chat app"
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder={"What's your name?"}
          />

          <Text>Please choose a chatroom:</Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              accessible={true}
              accessibleLabel="General and Pink"
              accessibleHint="Choose General chatroom and Pink background color"
              accessibilityRole="button"
              style={[styles.optionButton, styles.option1, (chatroom === 'General') && styles.optionSelected]}
              onPress={() => selectOption('pink', 'lightblue', 'brown', 'General')}
            >
              <Text>General</Text>
            </TouchableOpacity>

            <TouchableOpacity
              accessible={true}
              accessibleLabel="Tech and grey"
              accessibleHint="Choose Tech chatroom and grey background color"
              accessibilityRole="button"
              style={[styles.optionButton, styles.option2, (chatroom === 'Tech') && styles.optionSelected]}
              onPress={() => selectOption('grey', 'white', 'black', 'Tech')}
            >
              <Text>Tech</Text>
            </TouchableOpacity>

            <TouchableOpacity
              accessible={true}
              accessibleLabel="Memes and Light Green"
              accessibleHint="Choose Memes chatroom and Light Green background color"
              accessibilityRole="button"
              style={[styles.optionButton, styles.option3, (chatroom === 'Memes') && styles.optionSelected]}
              onPress={() => selectOption('lightgreen', 'pink', 'darkblue', 'Memes')}
            >
              <Text>Memes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              accessible={true}
              accessibleLabel="Art and orchid"
              accessibleHint="Choose Art chatroom and orchid background color"
              accessibilityRole="button"
              style={[styles.optionButton, styles.option4, (chatroom === 'Art') && styles.optionSelected]}
              onPress={() => selectOption('orchid', 'gold', 'purple', 'Art')}
            >
              <Text>Art</Text>
            </TouchableOpacity>

            <TouchableOpacity
              accessible={true}
              accessibleLabel="Gaming and skyblue"
              accessibleHint="Choose Gaming chatroom and skyblue background color"
              accessibilityRole="button"
              style={[styles.optionButton, styles.option5, (chatroom === 'Gaming') && styles.optionSelected]}
              onPress={() => selectOption('skyblue', 'dodgerblue', 'navy', 'Gaming')}
            >
              <Text>Gaming</Text>
            </TouchableOpacity>

            <TouchableOpacity
              accessible={true}
              accessibleLabel="Travel and crimson"
              accessibleHint="Choose Travel chatroom and crimson background color"
              accessibilityRole="button"
              style={[styles.optionButton, styles.option6, (chatroom === 'Travel') && styles.optionSelected]}
              onPress={() => selectOption('crimson', 'pink', 'gold', 'Travel')}
            >
              <Text>Travel</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            accessible={true}
            accessibleLabel="Go to Chat"
            accessibleHint="Submit your chosen name, background color, and chatroom and go to the Chat screen"
            accessibilityRole="button"
            style={[styles.submitButton, { backgroundColor: BGcolor }]}
            onPress={signInUser}
          >
            <Text>Submit Name and start Chatting!</Text>
          </TouchableOpacity>

          {/* this is for fixing a well-known issue with ios and the keyboard */}
          {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
        </View>
      </View>
    </LinearGradient>
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
    backgroundColor: 'pink',
    borderRadius: 20,
    color: 'white',
    padding: 10,
    marginTop: 10,
  },

  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  optionButton: {
    padding: 10,
    borderRadius: '50%',
    width: 100,
    height: 40,
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },
  option1: {
    backgroundColor: 'pink',
  },
  option2: {
    backgroundColor: 'grey',
  },
  option3: {
    backgroundColor: 'lightgreen',
  },
  option4: {
    backgroundColor: 'orchid',
  },
  option5: {
    backgroundColor: 'skyblue',
  },
  option6: {
    backgroundColor: 'crimson',
  },
  // shows which option is currently selected
  optionSelected: {
    borderColor: 'gold',
    borderWidth: 4,
    padding: 4
  },

  linearGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Start;
