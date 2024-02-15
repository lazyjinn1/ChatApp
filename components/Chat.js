import { useEffect, useState } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

const Chat = ({ route, navigation, db }) => {
  const [messages, setMessages] = useState([]);
  // name, color and userId taken from the route parameters
  const { name, color, userID } = route.params;

  useEffect(() => {
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
      setMessages(newMessages);
    });

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [db]);  //dependency array there so everytime it goes through a change, this code runs again.

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

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: userID,
          name: name
        }}
      />
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
