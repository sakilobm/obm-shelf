import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useCart } from '../../contexts/CartContext';
import CustomText from '../../components/common/CustomText';
import { useRouter } from 'expo-router';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Ionicons } from '@expo/vector-icons';
import ToastManager, { Toast } from 'toastify-react-native'

const { width, height } = Dimensions.get('window');

export default function CartScreen() {
    const { cartItems, totalAmount, removeFromCart } = useCart();
    const router = useRouter();

    const handleMakePayment = () => {
        if (cartItems.length === 0) {
            Toast.warn('Your cart is empty! Please add items to your cart before proceeding to payment.', 'bottom')
            // alert('Your cart is empty! Please add items to your cart before proceeding to payment.');
            return;
        }
        router.push('/PaymentSuccess');
    };

    return (
        <View style={styles.page}>

            {/* HEADER */}
            <View style={styles.header}>
                <CustomText variant="heading" style={{ color: 'black' }}>
                    Cart
                </CustomText>
                <View style={styles.cartCountBubble}>
                    <CustomText variant="small" style={{ color: 'black', fontSize: 14, }}>
                        {cartItems.length}
                    </CustomText>
                </View>
            </View>

            {/* BLACK BottomSheet container */}
            <View style={styles.cartContainer}>
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => `${item.productType}-${item.id}`}
                    contentContainerStyle={styles.cartList}

                    renderItem={({ item }) => {
                        const renderRightActions = () => (
                            <TouchableOpacity
                                onPress={() => removeFromCart(item.id, item.productType)}
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
                                    {/* Price ₹ */}
                                    <View style={styles.priceBubble}>
                                        <CustomText variant="subheading" style={{ color: 'black', fontSize: 18, marginTop: -5, }}>
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
                        <CustomText variant="subheading" style={{ color: 'black', fontSize: 14 }}>
                            Delivery Amount
                        </CustomText>
                        <CustomText variant="small" style={{ color: 'black', fontSize: 18 }}>
                            ₹50
                        </CustomText>
                    </View>
                    <CustomText variant="subheading" style={{ color: 'black', fontSize: 20 }}>
                        Total Amount
                    </CustomText>
                    <View style={styles.totalRow}>
                        <CustomText variant="subheading" style={{ color: 'black', fontFamily: 'Righteous', fontSize: 34 }}>
                            IND {totalAmount.toFixed(0)}
                        </CustomText>
                    </View>
                </View>

                {/* Make Payment Button */}
                <TouchableOpacity style={styles.paymentButton} onPress={handleMakePayment}>
                    <View style={styles.btnContent}>
                        <CustomText variant="heading" style={styles.btnText}>
                            Make Payment
                        </CustomText>
                        <Image
                            source={require('../../assets/png/make_payment_btn_icon.png')}
                            style={styles.btnIcon}
                            resizeMode="contain"
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <ToastManager />
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
        marginHorizontal: 40,
        marginBottom: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#1A1A1A',
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
        backgroundColor: 'white',
        width: width * 0.85,
        height: 85,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: 24,
    },

    btnContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },

    btnText: {
        fontSize: 20,
        fontFamily: 'Raleway-Bold',
        color: 'black',
        marginLeft: width * 0.1,
    },

    btnIcon: {
        width: 70,
        height: 70,
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

});
