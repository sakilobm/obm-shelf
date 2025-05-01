import React from 'react';
import { StyleSheet, Image } from 'react-native';
import Animated, { useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface Props {
    frame: {
        image: any;
    };
    isDetailVisible: Animated.SharedValue<number>;
}

export default function FrameImage({ frame, isDetailVisible }: Props) {
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: interpolate(
                        isDetailVisible.value,
                        [0, 1],
                        [0, -100],
                        Extrapolate.CLAMP
                    ),
                },
                {
                    scale: interpolate(
                        isDetailVisible.value,
                        [0, 1],
                        [1, 0.8],
                        Extrapolate.CLAMP
                    ),
                },
            ],
        };
    });

    return (
        <Animated.Image
            source={frame.image}
            style={[styles.image, animatedStyle]}
            resizeMode="contain"
        />
    );
}

const styles = StyleSheet.create({
    image: {
        position: 'absolute',
        zIndex: 10,
        top: hp('32%'),
        marginLeft: hp('10%'),
        width: wp('60%'),
        height: hp('60%'),
    },
});
