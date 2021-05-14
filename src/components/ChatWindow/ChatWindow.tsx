import React, {useState} from "react";
import {Message} from "./types";
import {Container} from "@material-ui/core";
import {ChatLog} from "./ChatLog";
import {ChatInput} from "./ChatInput";
import {UserNameDialogue} from "./ChatUserNameDialogue";


export const ChatWindow = () => {
  const [user, setUser] = useState<string | null>(localStorage.getItem("user"));

  function storeUser(user:string) {
    localStorage.setItem("user", user);
    setUser(user);
  }

  const [messages, setMessages] = useState<Message[]>([]);
  return (
    <>
      <Container style={{ height: '90vh', margin: 0, padding: 0 }}>
        <ChatLog messages={messages} />
      </Container>
      <Container style={{ height: '10vh', margin: 0, padding: 0 }}>
        <ChatInput user={user} addMessage={(message: Message) => setMessages([...messages, message])} />
      </Container>
      <UserNameDialogue user={user} setUser={storeUser} />
    </>
  );
}