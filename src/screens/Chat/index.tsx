import { useCallback, useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { THEME } from "../../styles/Theme";

const widthScreen = Dimensions.get('screen').width;

export default function ChatScrean() {
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/18acd369-ea44-471b-aeeb-9e6e8e3ed9d5/dfmj6b3-e25a64e8-bb64-4bb6-a2b5-f33b2284ff60.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE4YWNkMzY5LWVhNDQtNDcxYi1hZWViLTllNmU4ZTNlZDlkNVwvZGZtajZiMy1lMjVhNjRlOC1iYjY0LTRiYjYtYTJiNS1mMzNiMjI4NGZmNjAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.2iUKFMUZS0K0CEEST2fLJFjsMHxE4dxImjGWLn9xSUA',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    console.log('Mensagens enviadas:', messages);
    if (messages.length > 0) {
      setMessages((previousMessages: any) => GiftedChat.append(previousMessages, messages));
    }
  }, []);

  return(
    <View style={styles.container}>
      <GiftedChat
        messagesContainerStyle={{
          width: widthScreen - 20,
        }}
        messages={messages}
        onSend={(messages:any) => onSend(messages)}
        user={{
          _id: 1,
          name: 'Usuário',
          avatar: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/18acd369-ea44-471b-aeeb-9e6e8e3ed9d5/dfmj5ob-f93ac886-db5c-4168-bdf7-55c94736a4c2.png/v1/fit/w_595,h_595,q_70,strp/anime___digital_art_by_themingarts_dfmj5ob-375w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTk1IiwicGF0aCI6IlwvZlwvMThhY2QzNjktZWE0NC00NzFiLWFlZWItOWU2ZThlM2VkOWQ1XC9kZm1qNW9iLWY5M2FjODg2LWRiNWMtNDE2OC1iZGY3LTU1Yzk0NzM2YTRjMi5wbmciLCJ3aWR0aCI6Ijw9NTk1In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.LVeZXO-oeXnXt7GWFqEHX8gjlzv6EP3M3Qe-vQs_tOk',
        }}
        placeholder="Digite uma mensagem..."
        alwaysShowSend={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.colors.background,
  },
});