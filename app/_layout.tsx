import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { CartProvider } from '../contexts/CartContext';

export default function Layout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <CartProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </CartProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}