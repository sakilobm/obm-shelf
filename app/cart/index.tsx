import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useCart } from '../../contexts/CartContext';
import CustomText from '../../components/common/CustomText';
import { useRouter } from 'expo-router';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Rect } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export default function CartScreen() {
    const { cartItems, totalAmount, removeFromCart } = useCart();
    const router = useRouter();

    return (
        <View style={styles.page}>

            {/* HEADER */}
            <View style={styles.header}>
                <CustomText variant="heading" style={{ color: 'black' }}>
                    Cart
                </CustomText>
                <View style={styles.cartCountBubble}>
                    <CustomText variant="body" style={{ color: 'black' }}>
                        {cartItems.length}
                    </CustomText>
                </View>
            </View>

            {/* BLACK BottomSheet container */}
            <View style={styles.cartContainer}>

                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.cartList}

                    renderItem={({ item }) => {

                        const renderRightActions = () => (
                            <TouchableOpacity
                                onPress={() => removeFromCart(item.id)}
                                style={styles.deleteButton}
                            >
                                <Ionicons name="trash" size={24} color="white" />
                            </TouchableOpacity>
                        );

                        return (
                            <Swipeable renderRightActions={renderRightActions}>
                                <View style={styles.cartItem}>
                                    <View style={styles.imageWrapper}>
                                        <Image source={item.image} style={styles.cartItemImage} resizeMode="cover" />
                                    </View>

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

                                    <View style={styles.priceBubble}>
                                        <CustomText variant="subheading" style={{ color: 'black' }}>
                                            ₹ {(item.price * item.quantity).toFixed(2)}
                                        </CustomText>
                                    </View>
                                </View>
                            </Swipeable>
                        );
                    }}
                />

                {/* Delivery and Total Amount */}
                <View style={styles.summarySection}>
                    <View style={styles.deliveryRow}>
                        <CustomText variant="small" style={{ color: 'gray' }}>
                            Delivery Amount
                        </CustomText>
                        <CustomText variant="small" style={{ color: 'black' }}>
                            ₹50
                        </CustomText>
                    </View>
                    <View style={styles.totalRow}>
                        <CustomText variant="heading" style={{ color: 'black' }}>
                            IND {totalAmount.toFixed(0)}
                        </CustomText>
                        {/* <Image source={require('../../assets/png/TotalImage.png')} style={styles.totalImage} /> */}
                    </View>
                </View>

                {/* Make Payment Button */}
                <TouchableOpacity style={styles.paymentButton} onPress={() => { }}>
                    <CustomText variant="subheading" style={{ color: 'black' }}>
                        Make Payment
                    </CustomText>
                    <Svg width="105" height="80" viewBox="0 0 105 80" fill="none">
                        <Rect x="104.937" y="0.0634766" width="79.1111" height="104.54" rx="39.5556" transform="rotate(90 104.937 0.0634766)" fill="#FFEC89" />
                    </Svg>

                    <Ionicons name="arrow-forward-circle" size={24} color="black" style={{ marginLeft: 10 }} />
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white', // Whole page white background
    },
    header: {
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingTop: 50,
        marginBottom: 20,
    },
    cartCountBubble: {
        backgroundColor: '#FFEC89',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    cartContainer: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 20,
        paddingHorizontal: 16,
    },
    cartList: {
        paddingBottom: 80,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#222',
        padding: 12,
        borderRadius: 20,
    },
    imageWrapper: {
        height: 50,
        width: 50,
        borderRadius: 25,
        overflow: 'hidden',
        backgroundColor: '#fff',
        marginRight: 12,
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
    summarySection: {
        width: '100%',
        backgroundColor: '#FFEC89',
        padding: 16,
        borderRadius: 20,
        marginTop: 20,
        alignItems: 'center',
    },
    deliveryRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    totalRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    totalImage: {
        width: 50,
        height: 50,
        marginLeft: 10,
    },
    paymentButton: {
        marginTop: 30,
        marginBottom: 30,
        backgroundColor: '#FFEC89',
        width: width * 0.8,
        paddingVertical: 16,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },

});
