import { useEffect, useState } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';

const Chat = ({ route, navigation }) => {
  const [ messages, setMessages ] = useState([]);
  const { name, color } = route.params;

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello " + `${name}`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
  }

  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "purple"
        },
        left: {
          backgroundColor: "lightgreen"
        }
      }}
    />
  }

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1
        }}
      />
      {Platform.OS === "android"?<KeyboardAvoidingView behavior="height" />: null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;