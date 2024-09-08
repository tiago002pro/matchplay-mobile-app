import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { AuthProvider } from './src/context/AuthContext';
import { LogBox } from 'react-native';

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs([
      'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
    ]);
  }, []);

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