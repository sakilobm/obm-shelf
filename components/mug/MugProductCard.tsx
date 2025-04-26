import React, { useRef } from 'react';
import { Animated, View, FlatList, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import CustomText from '../common/CustomText';
import data from '../../data/mug/mugs';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;
const SPACING = 20;
const FULL_CARD_WIDTH = CARD_WIDTH + SPACING;

const MugProductList = () => {
    const { colors } = useTheme();
    const router = useRouter();
    const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <View>
            <Animated.FlatList
                data={data}
                keyExtractor={(item) => item.title}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={FULL_CARD_WIDTH}
                decelerationRate="fast"
                bounces={false}
                contentContainerStyle={{ paddingHorizontal: SPACING }}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                renderItem={({ item, index }) => {
                    const inputRange = [
                        (index - 1) * FULL_CARD_WIDTH,
                        index * FULL_CARD_WIDTH,
                        (index + 1) * FULL_CARD_WIDTH,
                    ];

                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.9, 1, 0.9],
                        extrapolate: 'clamp',
                    });

                    return (
                        <TouchableOpacity onPress={() => router.push('/mug')}>
                            <Animated.View style={[styles.card, { backgroundColor: item.color, transform: [{ scale }] }]}>
                                <BlurView intensity={250} style={styles.blurTopLeft} />

                                <View style={styles.textContainer}>
                                    <CustomText variant="heading" style={{ color: 'white' }}>{item.title}</CustomText>
                                    <View style={[styles.categoryBadge, { backgroundColor: item.cateConClr }]}>
                                        <CustomText variant="small" style={{ color: item.color }}>{item.category}</CustomText>
                                    </View>
                                </View>

                                <Image source={item.image} style={styles.productImage} resizeMode="contain" />

                                <BlurView intensity={150} style={styles.buyContainer}>
                                    <CustomText variant="subheading">₹{item.price}</CustomText>
                                    <TouchableOpacity>
                                        <Image style={styles.buyIcon} source={require('../../assets/png/Buy.png')} />
                                    </TouchableOpacity>
                                </BlurView>
                            </Animated.View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        height: CARD_WIDTH * 1.2,
        marginRight: SPACING,
        borderRadius: 30,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    blurTopLeft: {
        position: 'absolute',
        width: 150,
        height: 150,
        top: 0,
        left: 0,
        borderBottomRightRadius: 90,
        borderTopLeftRadius: 30,
    },
    textContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 10,
    },
    categoryBadge: {
        marginTop: 8,
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 20,
    },
    productImage: {
        width: 220,
        height: 220,
    },
    buyContainer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        width: 200,
        height: 60,
        borderRadius: 30,
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.5)',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    buyIcon: {
        width: 32,
        height: 32,
    },
});

export default MugProductList;
