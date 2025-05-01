import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, interpolate } from 'react-native-reanimated';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface Props {
    onLeft: () => void;
    onRight: () => void;
    index: number;
    max: number;
    isDetailVisible: Animated.SharedValue<number>;
}

export default function SlideControls({ onLeft, onRight, index, max, isDetailVisible }: Props) {
    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(isDetailVisible.value, [0, 1], [1, 0]),
            transform: [
                {
                    translateY: interpolate(isDetailVisible.value, [0, 1], [0, -10]),
                },
            ],
        };
    });

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <TouchableOpacity disabled={index === 0} onPress={onLeft}>
                <AntDesign name="leftcircleo" size={40} color={index === 0 ? '#999' : 'white'} />
            </TouchableOpacity>
            <TouchableOpacity disabled={index === max - 1} onPress={onRight}>
                <AntDesign name="rightcircleo" size={40} color={index === max - 1 ? '#999' : 'white'} />
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: hp('3%'),
        marginHorizontal: hp('3%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
