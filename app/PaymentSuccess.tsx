import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CustomText from '../components/common/CustomText';
import { useRouter } from 'expo-router';
import { useCart } from '../contexts/CartContext';

export default function PaymentSuccessScreen() {
    const router = useRouter();
    const { clearCart } = useCart(); // Add this in CartContext if not yet

    const handleDone = () => {
        clearCart(); // clear the cart after successful order
        router.replace('/'); // or navigate to home screen
    };

    return (
        <View style={styles.container}>
            {/* Suggestion : In Future We Can Use Lottie Files Animation */}
            <Image source={require('../assets/png/success.png')} style={styles.image} resizeMode="contain" />
            <CustomText variant="heading" style={styles.title}>
                Payment Successful!
            </CustomText>
            <CustomText variant="body" style={styles.subtitle}>
                Thank you for your purchase. Your order is being processed.
            </CustomText>

            <TouchableOpacity style={styles.button} onPress={handleDone}>
                <CustomText variant="subheading" style={{ color: 'black' }}>
                    Back to Home
                </CustomText>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 30,
    },
    title: {
        color: 'black',
        marginBottom: 10,
    },
    subtitle: {
        color: 'gray',
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#FFEC89',
        paddingVertical: 14,
        paddingHorizontal: 50,
        borderRadius: 40,
    },
});
