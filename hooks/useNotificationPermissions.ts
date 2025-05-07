import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { Platform, Alert } from 'react-native';

export default function useNotificationPermissions() {
    useEffect(() => {
        const requestPermission = async () => {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== 'granted') {
                Alert.alert('Permission required', 'Notification permission was not granted.');
            } else {
                console.log('✅ Notification permission granted.');
            }
        };

        if (Platform.OS === 'android' || Platform.OS === 'ios') {
            requestPermission();
        }
    }, []);
}
