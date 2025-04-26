import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FontFamily } from '../GlobalStyles'; // Optional, if you're using a custom font

const categories = [
    { title: 'All', icon: null, route: '/' },
    { title: 'Mugs', icon: 'cafe-outline', route: '/mug' },
    { title: 'Frame', icon: 'images-outline', route: '/product-frame' },
    { title: 'Album', icon: 'albums-outline', route: '/album' },
];

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
            {categories.map((cat, index) => {
                const isSelected = selected === cat.title;
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handlePress(cat)}
                        style={isSelected ? styles.selectedButton : styles.unSelectedButton}
                    >
                        {cat.icon && (
                            <Ionicons
                                name={cat.icon}
                                size={25}
                                color={isSelected ? '#DBBF2E' : '#1A1A1A'}
                            />
                        )}
                        {isSelected && (
                            <Text style={styles.selectedText}>{cat.title}</Text>
                        )}
                        {!cat.icon && (
                            <Text style={isSelected ? styles.selectedText : styles.defaultText}>
                                {cat.title}
                            </Text>
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 60,
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
