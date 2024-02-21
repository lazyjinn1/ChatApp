import { useEffect, useState } from 'react';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';

import CustomActions from './CustomActions';


const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const [messages, setMessages] = useState([]);

  // variables taken from our previous screen (in this case Start.js)
  const { name, BGcolor, leftColor, rightColor, userID, chatroom, } = route.params;

  useEffect(() => {
    if (!chatroom) {
      return;
    }
    navigation.setOptions({ title: chatroom });
    
    let unsubMessages;
    if (isConnected === true) {
      if (unsubMessages) unsubMessages();

      // This sets up where your messages are going to be stored in.
      const q = query(
        collection(db, chatroom), //note how i changed the second statement to chatroom so it changes based on what room is chosen
        orderBy('createdAt', 'desc') 
      );

      //onSnapshot takes a snapshot at each moment to make sure that everything matches what is currently in the database.
      const unsubMessages = onSnapshot(q, (messagesSnapshot) => {
        //pushing in that new data into the rest of my messages (Q)
        let newMessages = [];
        messagesSnapshot.forEach(doc => {
          //definign what a message should consist of.
          newMessages.push({
            id: doc.id,
            ...doc.data(), // this is a shortened form for which you just need to say, " and the rest".
            createdAt: new Date(doc.data().createdAt.toMillis()) //time set to "to milliseconds"
          });
        });
        //caches the message log so that it can be viewed even when offline (After loading it online once).
        cacheMessageLog(newMessages);
        setMessages(newMessages);
      });
    } else loadCacheMessages(); // if no internet connection is found, it loads the cached messages

    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected, db, chatroom]); // all this is checked every time these are changed

  const cacheMessageLog = async (logsToCache) => {
    try {
      await AsyncStorage.setItem('message_log', JSON.stringify(logsToCache)); // sets our cache
    } catch (error) {
      console.log(error.message);
    }
  }

  const loadCacheMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem('message_log') || []; // loads our cache
    setMessages(JSON.parse(cachedMessages));
  }

  useEffect(() => {
    navigation.setOptions({ title: chatroom }); // changes the title based on the chatroom
  }, [name, navigation]);

  const onSend = async (newMessages = []) => {
    const docRef = await addDoc(collection(db, chatroom), newMessages[0]); // sends our messages and saves them onto the collection
  };


  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: rightColor, //dynamically changes based on chatroom
          },
          left: {
            backgroundColor: leftColor,
          },
        }}

      />
    );
  };

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />; //this means if you are not connected, the message bar will not show
    else return null;
  }

  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} userID={userID} {...props} />; //this is for the separate menu for pictures and location
  };

  // custom view for locations
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (<MapView
        style={{
          width: 150,
          height: 100,
          borderRadius: 13,
          margin: 3
        }}
        region={{
          latitude: currentMessage.location.latitude,
          longitude: currentMessage.location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      />
      );
    }
  }

  return (
    <LinearGradient
      colors={[BGcolor, 'white', BGcolor]}
      style={[styles.container, { backgroundColor: BGcolor, }]}
    >{
        (isConnected === true) ?
        // This is our main technology used for this app
          <GiftedChat
            messages={messages}
            renderBubble={renderBubble}
            renderInputToolbar={renderInputToolbar}
            renderActions={renderCustomActions}
            renderCustomView={renderCustomView}
            onSend={newMessages => onSend(newMessages)}
            user={{
              _id: userID,
              name: name
            }}
          /> : null
      }
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior='height' />}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Chat;
