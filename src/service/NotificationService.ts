import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export function NotificationService() {

  async function registerForPushNotificationsAsync() {
    if (!Device.isDevice) {
      alert('Notificações push funcionam apenas em dispositivos físicos!');
    }
  
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
  
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
  
    if (finalStatus !== 'granted') {
      alert('Permissão para notificações foi negada!');
      return null;
    }
  
    const tokenData = await Notifications.getExpoPushTokenAsync();
    return tokenData.data.replace('ExponentPushToken[', '').replace(']', '');
  }

  function configureAndroidChannel() {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  }

  return {
    registerForPushNotificationsAsync,
    configureAndroidChannel,
  }
}