import React, { useRef } from 'react';
import { Animated, View, FlatList, StyleSheet, Dimensions, TouchableOpacity, Image, ImageBackground, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import CustomText from '../common/CustomText';
import Mugs from '../../data/mug/mugs';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Svg, { ClipPath, Defs, ForeignObject, Path, Rect } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { useWishlist } from '@/contexts/WishlistContext';
import ToastManager, { Toast } from 'toastify-react-native'

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;
const SPACING = 20;
const FULL_CARD_WIDTH = CARD_WIDTH + SPACING;

const MugProductList = () => {
    const router = useRouter();
    const scrollX = useRef(new Animated.Value(0)).current;

    const { wishlistItems, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    const toggleWishlist = (id: number, productType: string) => {
        if (isInWishlist(id, productType)) {
            removeFromWishlist(id, productType);
        } else {
            if (!isInWishlist(id, productType)) {
                Object.keys(Mugs).forEach(() => {
                    const mug = Mugs.find((m) => m.id === Number(id));
                    if (mug) {
                        addToWishlist({
                            id: mug.id,
                            productType: mug.productType,
                            title: mug.title,
                            subtitle: mug.category,
                            price: Number(mug.price),
                            image: mug.image,
                        });
                        Toast.info('Added To Your Wishlist', 'bottom')
                    }
                });
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleRow}>
                <CustomText variant="heading" style={{ fontSize: 24, fontFamily: 'Raleway-Regular', }}>Mugs Collections</CustomText>
                <TouchableOpacity style={{ marginRight: 12, }} onPress={() => { }}>
                    <FontAwesome5 name="long-arrow-alt-right" size={30} color="black" />
                </TouchableOpacity>
            </View>

            <Animated.FlatList
                data={Mugs}
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
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    {/* Top Content */}
                                    <BlurView intensity={250} style={styles.topContentBlur}>
                                        <LinearGradient
                                            colors={['rgba(0, 0, 0, 0.34)', 'rgba(255, 255, 255, 0.29)']}
                                            start={{ x: 0.1, y: 0.7 }}
                                            end={{ x: 0.9, y: 0.2 }}
                                            style={StyleSheet.absoluteFill}
                                        />
                                        <View style={styles.textContainer}>
                                            <Text style={styles.mugHeading}>{item.title.split(' ')[0]}{'\n'}{item.title.split(' ')[1]}</Text>
                                            <View style={[styles.categoryBadge, { backgroundColor: item.cateConClr }]}>
                                                <CustomText variant="small" style={{ color: item.color, textShadowColor: 'black', }}>{item.category || 'No Category'}</CustomText>
                                            </View>
                                        </View>
                                    </BlurView>
                                    {/* Wishlist Button */}
                                    <TouchableOpacity
                                        style={styles.heartIcon}
                                        onPress={() => toggleWishlist(item.id, item.productType)}
                                    >
                                        <View style={styles.heartIconCon}>
                                            <Ionicons
                                                name={isInWishlist(item.id, item.productType) ? 'heart' : 'heart-outline'}
                                                size={24}
                                                color={isInWishlist(item.id, item.productType) ? '#D74343' : 'white'}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                {/* Image */}
                                <View style={styles.productImageCon}>
                                    <Image source={item.image} style={styles.productImage} resizeMode="contain" />
                                </View>

                                {/* Button */}
                                <TouchableOpacity>
                                    <BlurView
                                        intensity={50}
                                        style={styles.buyButton}
                                    >
                                        <LinearGradient
                                            colors={['rgba(58, 52, 52, 0.19)', 'rgba(255,255,255,0.6)']}
                                            start={{ x: 0.1, y: 0.7 }}
                                            end={{ x: 0.9, y: 0.2 }}
                                            style={StyleSheet.absoluteFill}
                                        />
                                        <Text style={styles.price}>₹{item.price}</Text>
                                        <View style={styles.buyIcon}>
                                            <Image source={require('../../assets/png/BuyIcon.png')} style={{ width: 70, height: 50, }} resizeMode="contain" />
                                        </View>
                                    </BlurView>
                                </TouchableOpacity>
                            </Animated.View>
                        </TouchableOpacity >
                    );
                }}
            />
            <ToastManager />
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
        justifyContent: 'space-between',
    },
    heartIconCon: {
        backgroundColor: '#4A4A4A',
        paddingHorizontal: 4,
        paddingVertical: 4,
        borderRadius: 30,
        zIndex: 50,
    },
    heartIcon: {
        marginRight: 25,
        marginTop: 15,
        borderRadius: 30,
        zIndex: 50,
    },
    topContentBlur: {
        width: 150,
        height: 150,
        borderBottomRightRadius: 80,
    },
    textContainer: {
        marginTop: 20,
        marginLeft: 20,
    },
    mugHeading: {
        color: 'white',
        fontSize: 28,
        fontFamily: 'Raleway',
        // FIXME : Find Why Font Weight Are Not Working
        fontWeight: 'semibold',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    categoryBadge: {
        marginTop: 8,
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    productImageCon: {
        position: 'absolute',
        right: -220,
    },
    productImage: {
        width: CARD_WIDTH * 2,
        height: CARD_WIDTH * 1.3,
    },
    price: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'RocknRoll-One',
    },
    buyButton: {
        height: 69,
        flexDirection: 'row',
        justifyContent: 'space-between',
        resizeMode: 'contain',
        alignItems: 'center',
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'white',
        marginHorizontal: 20,
        paddingHorizontal: 20,
        marginBottom: 25,
        overflow: 'hidden',
    },
    buyIcon: {
        marginRight: -8,
    },
});

export default MugProductList;
