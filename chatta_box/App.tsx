/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

function App() {
  const env = process.env;
  const env1 = process.env.NODE_ENV;
  const api1 = process.env.API_TOKEN;
  const api2 = process.env.APP_ENV_API_TOKEN;
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text style={styles.sectionDescription}>AI Project</Text>
        <Text>{JSON.stringify(env, null, 2)}</Text>
        <Text>{env1}</Text>
        <Text>{api1}</Text>
        <Text>{api2}</Text>
        <View></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionDescription: {
    marginVertical: 8,
    fontSize: 18,
    fontWeight: '400'
  }
});

export default App;
