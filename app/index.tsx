import { StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { useTheme } from 'react-native-paper';

import HomeHeader from '../components/home/HomeHeader';
import CategoryTabs from '../components/home/CategoryTabs';
import MugProductCard from '../components/mug/MugProductCard';
import BottomSheet from '../components/home/BottomSheet';

export default function HomeScreen() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.container}>
      <HomeHeader />
      <CategoryTabs />
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
