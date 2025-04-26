import CustomText from '@/components/common/CustomText';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import cartItems from '../../data/mug/mugs';

export default function componentName() {
    const deliveryCharge = 50;
    const itemsTotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
    const totalAmount = itemsTotal + deliveryCharge;

    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <CustomText variant="heading">Cart</CustomText>
                <View style={styles.cartCountBubble}>
                    <CustomText variant="small">{cartItems.length}</CustomText>
                </View>
            </View>

            {/* Cart Items List */}
            <FlatList
                data={cartItems}
                renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                        <Image source={item.image} style={styles.cartItemImage} />
                        <View style={styles.cartItemDetails}>
                            <CustomText variant="subheading">{item.title}</CustomText>
                            <CustomText variant="small" style={{ color: 'gray' }}>{item.subTitle}</CustomText>
                        </View>
                        <View style={styles.priceBubble}>
                            <CustomText variant="subheading">₹{item.price}</CustomText>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.cartList}
            />

            {/* Delivery + Total Section */}
            <View style={styles.summarySection}>
                <View style={styles.deliveryRow}>
                    <CustomText variant="small">Delivery Amount</CustomText>
                    <CustomText variant="small">₹50</CustomText>
                </View>
                <View style={styles.totalRow}>
                    <CustomText variant="heading">IND {totalAmount}</CustomText>
                    {/* <Image source={require('../../assets/png/TotalImage.png')} style={styles.totalImage} /> */}
                </View>
            </View>

            {/* Make Payment Button */}
            <TouchableOpacity style={styles.paymentButton}>
                <CustomText variant="subheading" style={{ color: 'black' }}>
                    Make Payment
                </CustomText>
                <Ionicons name="arrow-forward-circle" size={24} color="black" />
            </TouchableOpacity>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    cartCountBubble: {
        backgroundColor: 'yellow',
        borderRadius: 20,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartList: {
        paddingBottom: 20,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    cartItemImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 10,
    },
    cartItemDetails: {
        flex: 1,
    },
    priceBubble: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
    },
    summarySection: {
        backgroundColor: 'yellow',
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
    },
    deliveryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalImage: {
        width: 60,
        height: 60,
    },
    paymentButton: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },

    // container: {
    //     flex: 1,
    //     backgroundColor: '#fff',
    //     paddingTop: 50,
    //     paddingBottom: 20,
    //     alignItems: 'center',
    // },
    // header: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     width: '100%',
    //     paddingHorizontal: 20,
    // },
    // cartCountBubble: {
    //     backgroundColor: '#FF6347',
    //     borderRadius: 15,
    //     paddingVertical: 5,
    //     paddingHorizontal: 10,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     marginLeft: 10,
    // }
    // cartItem: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'space-between',
    //     width: '100%',
    //     padding: 20,
    //     borderBottomWidth: 1,
    //     borderBottomColor: '#E0E0E0',
    //     backgroundColor: '#fff',
    //     borderRadius: 10,
    //     marginBottom: 10,
    // },
    // cartItemImage: {
    //     width: 60,
    //     height: 60,
    //     borderRadius: 10,
    // },
    // cartItemDetails: {
    //     flex: 1,
    //     marginLeft: 20,
    // },
    // priceBubble: {
    //     backgroundColor: '#FF6347',
    //     borderRadius: 15,
    //     paddingVertical: 5,
    //     paddingHorizontal: 10,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },

    // cartList: {
    //     width: '100%',
    //     paddingHorizontal: 20,
    // },

    // summarySection: {
    //     width: '100%',
    //     padding: 20,
    //     backgroundColor: '#FFEC89',
    //     borderRadius: 10,
    //     marginTop: 20,
    // },

    // deliveryRow: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     marginBottom: 10,
    // },

    // totalRow: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    // },

    // totalImage: {
    //     width: 50,
    //     height: 50,
    //     marginLeft: 10,
    // },

    // paymentButton: {
    //     backgroundColor: '#FF6347',
    //     paddingVertical: 15,
    //     paddingHorizontal: 30,
    //     borderRadius: 30,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     marginTop: 20,
    // },

    // paymentButtonText: {
    //     color: '#fff',
    //     fontSize: 18,
    //     fontWeight: 'bold',
    // },

    // paymentButtonIcon: {
    //     marginLeft: 10,
    // },

    // addToCartButton: {
    //     marginTop: 30,
    //     backgroundColor: '#FFEC89',
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     paddingVertical: 14,
    //     paddingHorizontal: 50,
    //     borderRadius: 40,
    // },

    // backButton: {
    //     position: 'absolute',
    //     top: 50,
    //     right: 20,
    //     zIndex: 10,
    // },
    // imageWrapper: {
    //     width: '100%',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },

});
