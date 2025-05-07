import { StyleSheet, ScrollView, useWindowDimensions, Platform } from 'react-native';
import { useTheme } from 'react-native-paper';

import HomeHeader from '../components/home/HomeHeader';
import CategoryTabs from '../components/home/CategoryTabs';
import MugProductCard from '../components/mug/MugProductCard';
import BottomSheet from '../components/home/BottomSheet';
import useNotificationPermissions from '@/hooks/useNotificationPermissions';
import AdBanner from '@/components/ads/AdBanner';

// CSS: For <- LEFT RIGHT -> paddingHorizontal 24
// CSS: For | TOP marginTop 20 || 15 || 10

export default function HomeScreen() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  useNotificationPermissions();

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.container}>
      <HomeHeader />
      <CategoryTabs />
      <AdBanner />
      <MugProductCard />
      <BottomSheet />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginVertical: 20,
    // marginHorizontal: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
});
