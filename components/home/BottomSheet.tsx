import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated';
import BottomBar from '../layout/BottomBar';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Customize bottom sheet height (like 100-120px)
const BOTTOM_BAR_HEIGHT = SCREEN_HEIGHT * 0.16;
const DRAG_THRESHOLD = SCREEN_HEIGHT / 3;

const BottomSheet = () => {
    const translateY = useSharedValue(0);
    const context = useSharedValue({ y: 0 });

    const scrollTo = useCallback((destination: number) => {
        'worklet';
        translateY.value = withSpring(destination, { damping: 30 });
    }, []);

    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value };
        })
        .onUpdate((event) => {
            translateY.value = event.translationY + context.value.y;
            translateY.value = Math.max(translateY.value, -SCREEN_HEIGHT + BOTTOM_BAR_HEIGHT);
        })
        .onEnd(() => {
            if (translateY.value > -DRAG_THRESHOLD) {
                scrollTo(0); // Close
            } else {
                scrollTo(-SCREEN_HEIGHT + BOTTOM_BAR_HEIGHT); // Open
            }
        });

    useEffect(() => {
        scrollTo(0); // Start closed
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        const borderRadius = interpolate(
            translateY.value,
            [-SCREEN_HEIGHT + BOTTOM_BAR_HEIGHT, 0],
            [20, 30],
            Extrapolate.CLAMP
        );

        return {
            borderRadius,
            transform: [{ translateY: translateY.value }],
        };
    });

    return (
        <View style={StyleSheet.absoluteFill}>
            <GestureDetector gesture={gesture}>
                <Animated.View style={[styles.container, animatedStyle]}>
                    <BottomBar />
                </Animated.View>
            </GestureDetector>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: SCREEN_HEIGHT,
        position: 'absolute',
        top: SCREEN_HEIGHT - 120,
        // top: SCREEN_HEIGHT - 40,
        backgroundColor: '#1A1A1A',
        alignItems: 'center',
        zIndex: 10,
    },

});

export default BottomSheet;
