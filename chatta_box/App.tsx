import React, {useRef, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput
} from 'react-native';
import OpenAI from 'openai';

const env = process.env.NODE_ENV;
const apiKey = process.env.OPENAI_API_KEY;
const org = process.env.OPENAI_ORG;

const openai = new OpenAI({
  //https://api.openai.com/v1/chat/completions
  // baseURL: 'https://api.openai.com/v1',
  apiKey: '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'
});

function App() {
  // const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(
    'Hello ChatGPT. Calling you from NodsJS.'
  );
  const [response, setResponse] = useState({});
  const [error, setError] = useState('');

  async function chat() {
    if (message) {
      try {
        const chatCompetion = await openai.chat.completions.create({
          messages: [{role: 'user', content: message}],
          model: 'gpt-3.5-turbo'
        });
        setResponse(chatCompetion);
        setMessage('');
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
        console.log(e);
      }
    }
  }

  async function manual() {
    const url = 'https://api.openai.com/v1/chat/completions';
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: 'Hello from NodeJS'
        }
      ]
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + apiKey
        },
        body: JSON.stringify(data)
      });
      setResponse(await response.json());
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
      console.log(e);
    }
  }

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.container}>
        <Text style={styles.header}>AI Project</Text>
        <Text>{env}</Text>
        <Text>{apiKey}</Text>
        <Text>{org}</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Message"
          onChangeText={setMessage}
          onSubmitEditing={chat}
          value={message}
        />
        <Button title="Chat" onPress={chat} />
        <Button title="Fetch" onPress={manual} />
        {response && <Text>{JSON.stringify(response, null, 2)}</Text>}
        {error && <Text>{error}</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8
  },
  header: {
    marginVertical: 8,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center'
  },
  inputStyle: {
    borderWidth: 0.51,
    borderColor: 'grey',
    padding: 8,
    borderRadius: 8,
    marginVertical: 8
  }
});

export default App;
