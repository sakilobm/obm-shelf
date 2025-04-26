import { View, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { useTheme, Text, IconButton } from 'react-native-paper';

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

      <View style={styles.titleRow}>
        <Text variant="titleMedium">Mugs Collections</Text>
        <IconButton icon="arrow-right" onPress={() => { }} />
      </View>

      <MugProductCard />

      <BottomSheet />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
});
