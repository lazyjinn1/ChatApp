import { StyleSheet, LogBox, Alert} from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { getStorage } from 'firebase/storage';

//for navigation
const Stack = createNativeStackNavigator();

//lets us ignore some errors
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  
  const connectionStatus = useNetInfo();
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

  // initializing our storage for images
  const storage = getStorage(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection lost');
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

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
          {props => 
          <Chat 
            isConnected={connectionStatus.isConnected} 
            db={db} 
            storage={storage}
            {...props} 
          />}
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
