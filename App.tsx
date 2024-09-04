import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { NativeBaseProvider, StatusBar } from 'native-base';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StatusBar barStyle={'light-content'}/>
        <Routes/>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}