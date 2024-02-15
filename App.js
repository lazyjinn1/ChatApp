import { StyleSheet, LogBox } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  // Taken from our firebase database
  const firebaseConfig = {
    apiKey: "AIzaSyBo4MmKQ3XyNr6eAxIrZAuO2so5FbOtFyE",
    authDomain: "chatapp-bcc27.firebaseapp.com",
    projectId: "chatapp-bcc27",
    storageBucket: "chatapp-bcc27.appspot.com",
    messagingSenderId: "478829141768",
    appId: "1:478829141768:web:415949601bd18defe916bd",
    measurementId: "G-6NNX7TGZYE"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    //this shows all the possible places you can go
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
        >
          {props => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
