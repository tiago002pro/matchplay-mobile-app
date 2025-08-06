import 'moment/locale/pt-br';
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { AuthProvider } from './src/contexts/AuthContext';
import { LogBox } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { SocketProvider } from 'contexts/SocketContext';
import { UnreadMessagesProvider } from 'contexts/UnreadMessagesContext';
import NotificationSetup from 'notification/NotificationSetup';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs([
      'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
    ]);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider>
        <NavigationContainer>
          <AuthProvider>
            <SocketProvider>
              <UnreadMessagesProvider>
                <StatusBar barStyle={'light-content'} />
                <Routes />
                <NotificationSetup />
              </UnreadMessagesProvider>
            </SocketProvider>
          </AuthProvider>
        </NavigationContainer>
        <FlashMessage position="top" />
      </NativeBaseProvider>
    </GestureHandlerRootView> 
  );
}
