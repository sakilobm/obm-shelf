import React, { useRef } from 'react';
import { Animated, View, FlatList, StyleSheet, Dimensions, TouchableOpacity, Image, ImageBackground, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import CustomText from '../common/CustomText';
import data from '../../data/mug/mugs';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Svg, { ClipPath, Defs, ForeignObject, LinearGradient, Path, Rect } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;
const SPACING = 20;
const FULL_CARD_WIDTH = CARD_WIDTH + SPACING;

const MugProductList = () => {
    const { colors } = useTheme();
    const router = useRouter();
    const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <View style={styles.container}>
            <View style={styles.titleRow}>
                <CustomText variant="heading" style={{ fontSize: 24, fontFamily: 'Raleway-Regular', }}>Mugs Collections</CustomText>
                <TouchableOpacity style={{ marginRight: 12, }} onPress={() => { }}>
                    <FontAwesome5 name="long-arrow-alt-right" size={30} color="black" />
                </TouchableOpacity>
            </View>

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
                                {/* Top Content */}
                                <View style={styles.textContainer}>
                                    <CustomText variant="heading" style={{ color: 'white' }}>{item.title.split(' ')[0]}{'\n'}{item.title.split(' ')[1]}</CustomText>
                                    <View style={[styles.categoryBadge, { backgroundColor: item.cateConClr }]}>
                                        <CustomText variant="small" style={{ color: item.color }}>{item.category}</CustomText>
                                    </View>
                                </View>
                                {/* Image */}
                                <View style={styles.productImageCon}>
                                    <Image source={item.image} style={styles.productImage} resizeMode="contain" />
                                </View>

                                {/* Button */}
                                <TouchableOpacity>
                                    <ImageBackground
                                        source={require('../../assets/png/BuyGlassorphismButton.png')}
                                        style={[styles.buyButton]}
                                        imageStyle={{ borderRadius: 40, opacity: 0.99 }} // Ensures the image respects the border radius
                                    >
                                        <Text style={{ fontSize: 20, color: 'black', fontFamily: 'RocknRoll-One', marginLeft: 8, }}>₹{item.price}</Text>
                                        <View style={styles.buyIcon}>
                                            <Svg width="73" height="55" viewBox="0 0 73 55" fill="none">
                                                <Rect x="72.2361" width="54.6666" height="72.2381" rx="27.3333" transform="rotate(90 72.2361 0)" fill="#1A1A1A" />
                                                <Path d="M32.7346 19.1084L29.1252 23.0932" stroke="white" strokeWidth="1.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <Path d="M39.0961 19.1084L42.7055 23.0932" stroke="white" strokeWidth="1.75" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <Path d="M25.9443 25.5295C25.9443 23.4986 26.9314 23.334 28.1578 23.334H43.672C44.8984 23.334 45.8855 23.4986 45.8855 25.5295C45.8855 27.8896 44.8984 27.725 43.672 27.725H28.1578C26.9314 27.725 25.9443 27.8896 25.9443 25.5295Z" stroke="white" strokeWidth="1.75" />
                                                <Path d="M27.4398 27.8906L28.8457 34.0819C29.1647 36.2115 29.9325 37.7703 32.7841 37.7703H38.7964C41.8972 37.7703 42.3559 36.2774 42.7148 34.2136L44.3899 27.8906" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
                                            </Svg>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </Animated.View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 20,
        paddingHorizontal: 24,
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_WIDTH * 1.2,
        marginRight: SPACING,
        borderRadius: 38,
        overflow: 'hidden',
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
        marginTop: 20,
        marginLeft: 20,
    },
    categoryBadge: {
        marginTop: 8,
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    productImageCon: {
        flex: 1, // Ensures the container takes up available space
        justifyContent: 'center', // Centers the image vertically
        alignItems: 'flex-end', // Aligns the image to the right
    },
    productImage: {
        width: 300,
        height: 290,
    },
    buyButton: {
        position: 'absolute',
        bottom: 30,
        left: 28,
        width: 220,
        height: 70,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        resizeMode: 'contain',
        alignItems: 'center',
        paddingHorizontal: 20,
        overflow: 'hidden', // Ensures children stay within the rounded corners
    },
    buyIcon: {
        marginRight: -10,
        // width: 32,
        // height: 32,
    },
});

export default MugProductList;
