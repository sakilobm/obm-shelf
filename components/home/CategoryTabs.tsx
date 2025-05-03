import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const categories = [
    { title: 'All', icon: null, route: '/' },
    { title: 'Mugs', icon: 'cafe-outline', route: '/' },
    { title: 'Frame', icon: 'images-outline', route: '/frame' },
    { title: 'Album', icon: 'albums-outline', route: '/album' },
];

// FIXME: Category Not Properly Active When Back From Frame
const TabBarCategory = () => {
    const [selected, setSelected] = useState('Mugs');
    const router = useRouter();

    const handlePress = (cat) => {
        setSelected(cat.title);
        if (cat.route) {
            router.push(cat.route);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.container}
                renderItem={({ item }) => {
                    const isSelected = selected === item.title;
                    return (
                        <TouchableOpacity
                            onPress={() => handlePress(item)}
                            style={isSelected ? styles.selectedButton : styles.unSelectedButton}
                        >
                            {item.icon && (
                                <Ionicons
                                    name={item.icon}
                                    size={25}
                                    color={isSelected ? '#DBBF2E' : '#1A1A1A'}
                                />
                            )}
                            {isSelected && (
                                <Text style={styles.selectedText}>{item.title}</Text>
                            )}
                            {!item.icon && (
                                <Text style={isSelected ? styles.selectedText : styles.defaultText}>
                                    {item.title}
                                </Text>
                            )}
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 15,
    },
    unSelectedButton: {
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: 69,
        height: 69,
        borderRadius: 38,
        backgroundColor: '#E0DFE2',
    },
    selectedButton: {
        flexDirection: 'row',
        marginLeft: 7,
        justifyContent: 'center',
        alignItems: 'center',
        width: 121,
        height: 69,
        borderRadius: 38,
        backgroundColor: '#1A1A1A',
    },
    selectedText: {
        color: 'white',
        fontSize: 13,
        fontFamily: 'RocknRoll One',
        marginLeft: 8,
    },
    defaultText: {
        color: 'black',
        fontSize: 13,
        fontFamily: 'RocknRoll One',
    },
});

export default TabBarCategory;
