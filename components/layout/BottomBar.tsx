import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList, } from 'react-native';
import React from 'react';
import { SvgXml } from 'react-native-svg';
import { useCart } from '../../contexts/CartContext';
import { useRouter } from 'expo-router';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomText from '../common/CustomText';

const BottomBarNavigation = () => {
    const svgXml = `
    <svg width="405" height="113" viewBox="8 0 405 113" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M182 4H223.944" stroke="#A7A7A7" stroke-width="8" stroke-linecap="round"/>
      <path d="M0 34C0 17.4315 13.4315 4 30 4H140.52C144.734 4 148.9 4.8877 152.748 6.60528L164.899 12.0289C168.747 13.7464 172.913 14.6341 177.127 14.6341H225.553C229.341 14.6341 233.095 13.9166 236.617 12.5194L252.758 6.1148C256.28 4.71758 260.034 4 263.822 4H375C391.569 4 405 17.4315 405 34V83C405 99.5685 391.569 113 375 113H30C13.4315 113 0 99.5685 0 83V34Z" fill="#1A1A1A"/>
    </svg>
  `;

    const { cartItems, removeFromCart } = useCart();
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.dragLine} />
            {/* <SvgXml xml={svgXml} style={styles.svgBackground} /> */}

            {/* Bottom Bar */}
            <View style={styles.cartContainer}>
                {cartItems.map((item) => {
                    const renderRightActions = () => (
                        <TouchableOpacity
                            onPress={() => removeFromCart(item.id)}
                            style={styles.deleteButton}
                        >
                            <Ionicons name="trash" size={24} color="white" />
                        </TouchableOpacity>
                    );

                    return (
                        <Swipeable key={item.id} renderRightActions={renderRightActions}>
                            <View style={styles.cartItem}>
                                <View style={styles.cartItemDetails}>
                                    <CustomText variant="subheading" style={{ color: 'white' }}>
                                        {item.title}
                                    </CustomText>
                                    <CustomText variant="small" style={{ color: 'gray', marginTop: 2 }}>
                                        {item.subtitle}
                                    </CustomText>
                                    <CustomText variant="small" style={{ color: 'white', marginTop: 2 }}>
                                        x{item.quantity} pcs
                                    </CustomText>
                                </View>

                                <View style={styles.imageWrapper}>
                                    <Image source={item.image} style={styles.cartItemImage} resizeMode="cover" />
                                </View>
                            </View>
                        </Swipeable>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: wp('100%'),
        height: hp('15%'), // Bottom bar height dynamic
        position: 'absolute',
        backgroundColor: 'transparent',
    },
    dragLine: {
        width: 60,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 3,
        marginTop: 10,
        alignSelf: 'center',
    },
    cartContainer: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 10,
        paddingHorizontal: 16,
    },
    cartList: {
        paddingBottom: 80,
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%',
        width: 70,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },

    // cartItem: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     marginBottom: 20,
    //     backgroundColor: '#222',
    //     padding: 12,
    //     borderRadius: 20,
    // },
    imageWrapper: {
        height: 50,
        width: 50,
        borderRadius: 25,
        overflow: 'hidden',
        backgroundColor: '#fff',
        // marginRight: 40,
    },
    cartItemImage: {
        height: '100%',
        width: '100%',
    },
    cartItemDetails: {
        flex: 1,
    },
    priceBubble: {
        backgroundColor: '#FFEC89',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    svgBackground: {
        position: 'absolute',
        width: wp('100%'),
        height: hp('15%'),
        bottom: 0,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: '#222',
        borderWidth: 2,
        borderColor: '#222',
        // borderColor: '#FFEC89',
        padding: 12,
        borderRadius: 20,
        width: wp('90%'),
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-around',
        height: '100%',
        paddingHorizontal: wp('10%'),
        paddingBottom: hp('2%'),
    },
    circleContainer: {
        height: hp('5.5%'),
        width: hp('5.5%'),
        backgroundColor: '#FFEC89',
        borderRadius: 50,
        padding: 10,
    },
    circleText: {
        fontSize: hp('2%'),
        fontFamily: 'Raleway-Medium',
        textAlign: 'center',
    },
    cartCenter: {
        marginLeft: wp('5%'),
        alignItems: 'center',
    },
    cartText: {
        fontSize: hp('2.2%'),
        fontFamily: 'RocknRoll One',
        color: 'white',
    },
    cartItemCount: {
        fontSize: hp('1.7%'),
        fontFamily: 'RocknRoll One',
        color: 'rgba(255, 255, 255, 0.5)',
    },
    cartButton: {
        height: hp('7%'),
        width: hp('7%'),
        backgroundColor: 'white',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#D74343',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartIcon: {
        height: hp('3.5%'),
        width: hp('3.5%'),
    },
});

export default BottomBarNavigation;
