import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    Image,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { StatusBar } from 'react-native';

const { width } = Dimensions.get('window');

export default function SettingsScreen() {
    const router = useRouter();
    const translateX = useSharedValue(0);

    const onGestureEvent = (event: any) => {
        translateX.value = event.nativeEvent.translationX;
    };

    const animatedPreviewStyle = useAnimatedStyle(() => {
        const scale = interpolate(translateX.value, [-width, 0], [0.85, 1]);
        const opacity = interpolate(translateX.value, [-width, 0], [0.4, 1]);

        return {
            transform: [{ scale }],
            opacity,
        };
    });

    const settingsOptions = [
        { icon: 'person', image: require('../../assets/png/profile_icon.png'), label: 'Profile' },
        { icon: 'shopping-cart', image: require('../../assets/png/cart_icon.png'), label: 'My orders' },
        { icon: 'favorite-border', image: require('../../assets/png/favorites_icon.png'), label: 'Favorites' },
        { icon: 'local-shipping', image: require('../../assets/png/delivery_icon.png'), label: 'Delivery' },
        { icon: 'settings', image: require('../../assets/png/settings_icon.png'), label: 'Settings' },
    ];

    return (
        (<SafeAreaView style={styles.container}>
            {/* Status Bar */}
            <StatusBar barStyle="light-content" backgroundColor="#100F0F" />
            <View style={styles.menu}>
                {/* Bubbles */}
                <View style={styles.bigBubble}>
                    <Svg width="191" height="79" viewBox="0 0 191 79" fill="none">
                        <Circle cx="95.5" cy="-16.5" r="95.5" fill="#373737" fill-opacity="0.87" />
                    </Svg>
                </View>
                <View style={styles.circle}>
                    <Image source={require('../../assets/png/circle.png')} style={{ height: 23, width: 23, }} />
                </View>

                {/* Settings Menu - Left */}
                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign name="close" size={24} color="white" style={styles.closeIcon} />
                </TouchableOpacity>

                <View style={{ marginTop: 10 }}>
                    {settingsOptions.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.menuItem}>
                            <Image source={item.image} style={{ width: 24, height: 24, }} />
                            <Text style={styles.menuText}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

            </View>
            {/* Small Bubble */}
            <View style={styles.smallBubble}>
                <Image source={require('../../assets/png/small_bubble.png')} style={{ height: 107, width: 109, }} />
            </View>
            {/* Logout */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.logOut}>
                    <Image source={require('../../assets/png/logout_icon.png')} style={{ width: 24, height: 24, }} />
                    <Text style={styles.menuText}>Log out</Text>
                </TouchableOpacity>
            </View>

            {/* Preview Content - Right */}
            {/* <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View style={[styles.previewOverlay, animatedPreviewStyle]}>
                    <Image source={require('../../assets/png/HomeScreen.png')} style={{ width: '100%', height: '100%', }} />
                    <Text style={styles.previewPlaceholder}>Preview Screen</Text>
                </Animated.View>
            </PanGestureHandler> */}
        </SafeAreaView>)
    );
}

const styles = StyleSheet.create({
    bigBubble: {
        position: 'absolute',
        top: -10,
        right: -60,
        width: 287,
        height: 191,
    },
    circle: {
        position: 'absolute',
        top: 105,
        left: 155,
        width: 287,
        height: 191,
    },
    smallBubble: {
        position: 'absolute',
        bottom: 10,
        left: 40,
        width: 287,
        height: 191,
    },
    container: {
        flex: 1,
        backgroundColor: '#100F0F',
        flexDirection: 'row',
    },
    menu: {
        width: '100%',
        paddingTop: 30,
        paddingHorizontal: 20,
        backgroundColor: '#000',
    },
    closeIcon: {
        marginTop: 40,
        marginBottom: 60,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 56,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 40,
        right: 30,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    logOut: {
        flexDirection: 'row',
        // marginBottom: 30,
    },
    menuText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 16,
        fontFamily: 'Raleway',
    },
    signOut: {
        marginBottom: 30,
    },
    previewOverlay: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        overflow: 'hidden',
    },
    previewPlaceholder: {
        marginTop: 50,
        fontSize: 24,
        alignSelf: 'center',
        fontWeight: 'bold',
        color: '#aaa',
    },
});
