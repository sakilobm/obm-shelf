import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useCart } from '../../contexts/CartContext';
import CustomText from '../../components/common/CustomText';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function CartScreen() {
    const { cartItems, totalAmount } = useCart();
    const router = useRouter();

    return (
        <View style={styles.page}>

            {/* HEADER */}
            <View style={styles.header}>
                <CustomText variant="heading" style={{ color: 'black' }}>
                    Cart
                </CustomText>
                <View style={styles.cartCountBubble}>
                    <CustomText variant="small" style={{ color: 'black' }}>
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
                    renderItem={({ item }) => (
                        <View style={styles.cartItem}>

                            {/* Mug Image */}
                            <View style={styles.imageWrapper}>
                                <Image source={item.image} style={styles.cartItemImage} resizeMode="cover" />
                            </View>

                            {/* Title + Type */}
                            <View style={styles.cartItemDetails}>
                                <CustomText variant="subheading" style={{ color: 'white' }}>
                                    {item.title}
                                </CustomText>
                                <CustomText variant="small" style={{ color: 'gray', marginTop: 2 }}>
                                    {item.subtitle}
                                </CustomText>
                            </View>

                            {/* Price */}
                            <View style={styles.priceBubble}>
                                <CustomText variant="subheading" style={{ color: 'black' }}>
                                    ₹{item.price}
                                </CustomText>
                            </View>

                        </View>
                    )}
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
        height: height * 0.1,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingTop: 50,
    },
    cartCountBubble: {
        backgroundColor: '#FFEC89',
        paddingHorizontal: 10,
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
        paddingBottom: 100,
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
        borderRadius: 25, // <- Circle image
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
        backgroundColor: '#FFEC89',
        width: width * 0.8,
        paddingVertical: 16,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
});
