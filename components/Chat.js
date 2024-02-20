import { useEffect, useState } from 'react';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Chat = ({ route, navigation, db, isConnected }) => {
  const [messages, setMessages] = useState([]);
  // name, color and userId taken from the route parameters
  const { name, color, userID } = route.params;

  useEffect(() => {
    let unsubMessages;

    if (isConnected === true) {
      if (unsubMessages) unsubMessages();

      // This sets up where your messages are going to be stored in.
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));

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
        cacheMessageLog(newMessages);
        setMessages(newMessages);
      });
    } else loadCacheMessages();

    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected, db]);

  const cacheMessageLog = async (logsToCache) => {
    try {
      await AsyncStorage.setItem('message_log', JSON.stringify(logsToCache));
    } catch (error) {
      console.log(error.message);
    }
  }

  const loadCacheMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem('message_log') || [];
    setMessages(JSON.parse(cachedMessages));
  }

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [name, navigation]);

  const onSend = async (newMessages = []) => {
    const docRef = await addDoc(collection(db, 'messages'), newMessages[0]);
  };


  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'orange',
          },
          left: {
            backgroundColor: 'lightblue',
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
   }


  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      {
        (isConnected === true) ?
          <GiftedChat
            messages={messages}
            renderBubble={renderBubble}
            renderInputToolbar={renderInputToolbar}
            onSend={newMessages => onSend(newMessages)}
            user={{
              _id: userID,
              name: name
            }}
          /> : null
      }
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior='height' />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
