import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { NativeBaseProvider, StatusBar } from 'native-base';
import 'react-native-gesture-handler';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AuthProvider>
          <StatusBar barStyle={'light-content'}/>
          <Routes/>
        </AuthProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}