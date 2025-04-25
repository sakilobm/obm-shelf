import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Chip, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';

const categories = [
    { title: 'All', route: '/' },
    { title: 'Mugs', route: '/mug' },
    { title: 'Albums', route: '/albums' },
];

const CategoryTabs: React.FC = () => {
    const { colors } = useTheme();
    const router = useRouter();

    const handleSelect = (route: string) => {
        router.push(route);
    };

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
            {categories.map((cat) => (
                <View key={cat.title} style={styles.chipWrapper}>
                    <Chip
                        mode="outlined"
                        onPress={() => handleSelect(cat.route)}
                        style={{ backgroundColor: colors.surface }}
                        textStyle={{ color: colors.primary }}
                    >
                        {cat.title}
                    </Chip>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scroll: {
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    chipWrapper: {
        marginRight: 10,
    },
});

export default CategoryTabs;
