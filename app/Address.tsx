import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import CustomText from '../components/common/CustomText';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AddressScreen() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');

    const handleSave = () => {
        if (!name || !phone || !location) {
            alert("Please fill in all fields");
            return;
        }
        // Here you'd save to context or local storage
        router.back(); // or go to summary/payment
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.select({ ios: 'padding' })}>
            <TouchableOpacity onPress={() => router.push('/mug')} style={{ marginBottom: 20 }}>
                <Ionicons name="arrow-back-circle" size={40} color="white" style={{ marginLeft: 10 }} />
            </TouchableOpacity>

            <CustomText variant="heading" style={{ marginBottom: 20 }}>
                Delivery Address
            </CustomText>

            <TextInput
                placeholder="Your Name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />

            <TextInput
                placeholder="Mobile Number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                style={styles.input}
            />

            <TextInput
                placeholder="Location / Address"
                placeholderTextColor="#999"
                multiline
                numberOfLines={3}
                value={location}
                onChangeText={setLocation}
                style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
            />

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <CustomText variant="subheading" style={{ color: 'black' }}>
                    Save Address
                </CustomText>
                <Ionicons name="checkmark-circle" size={24} color="black" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        padding: 24,
    },
    input: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 14,
        marginBottom: 16,
        fontFamily: 'Urbanist',
        fontSize: 16,
    },
    saveBtn: {
        marginTop: 20,
        backgroundColor: '#FFEC89',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 40,
    },
});
