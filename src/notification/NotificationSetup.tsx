import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { useAuth } from 'contexts/AuthContext';
import { NotificationService } from 'service/NotificationService';
import { UserService } from 'service/UserService';

export default function NotificationSetup() {
  const { authState } = useAuth();
  const { configureAndroidChannel, registerForPushNotificationsAsync } = NotificationService();
  const { updateExpoNotificationToken } = UserService();

  useEffect(() => {
    configureAndroidChannel();

    registerForPushNotificationsAsync().then(token => {
      if (token && authState.user?.id) {
        updateExpoNotificationToken(authState.user.id, token).then();
      }
    });

    const notificationSubscription = Notifications.addNotificationReceivedListener(notification => {
      Notifications.scheduleNotificationAsync({
        content: {
          title: notification.request.content.title,
          body: notification.request.content.body,
          data: notification.request.content.data,
        },
        trigger: null,
      });
    });

    const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Interação com a notificação:', response);
    });

    return () => {
      notificationSubscription.remove();
      responseSubscription.remove();
    };
  }, [authState.user?.id]);

  return null;
}
