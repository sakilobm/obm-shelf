import React, { useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import BannerAd, { AdManager } from 'react-native-admob-native-ads';
import Constants from 'expo-constants';

export default function AdBanner() {
    useEffect(() => {
        AdManager.setRequestConfiguration({
            testDeviceIds: ['EMULATOR'], // Replace with real test device ID if needed
        });
    }, []);

    const adUnitId = Platform.select({
        android: Constants.expoConfig?.extra?.ADMOB_AD_UNIT_ID,
        ios: 'ca-app-pub-3940256099942544/2934735716',
    });

    return (
        <View style={styles.adContainer}>
            <BannerAd
                adUnitID={adUnitId}
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
