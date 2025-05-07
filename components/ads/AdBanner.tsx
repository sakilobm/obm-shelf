import React, { useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import BannerAd, { AdManager } from 'react-native-admob-native-ads';

export default function AdBanner() {
    useEffect(() => {
        AdManager.setRequestConfiguration({
            testDeviceIds: ['EMULATOR'], // Replace with real test device ID if needed
        });
    }, []);

    return (
        <View style={styles.adContainer}>
            <BannerAd
                adUnitID={
                    Platform.OS === 'android'
                        ? 'ca-app-pub-3940256099942544/6300978111' // Test Android Banner ID
                        : 'ca-app-pub-3940256099942544/2934735716' // Test iOS Banner ID
                }
                adSize="FULL_BANNER"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    adContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
});
