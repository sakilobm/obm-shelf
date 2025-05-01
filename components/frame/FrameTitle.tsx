import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, interpolate } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface Props {
    frame: {
        name: string;
    };
    isDetailVisible: Animated.SharedValue<number>;
    onMorePress: () => void;
}

export default function FrameTitle({ frame, isDetailVisible, onMorePress }: Props) {
    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(isDetailVisible.value, [0, 1], [1, 0]),
            transform: [
                {
                    translateY: interpolate(isDetailVisible.value, [0, 1], [0, -30]),
                },
            ],
        };
    });

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <Text style={styles.firstTitle}>FINALIST</Text>
            <Text style={styles.secondTitle}>{frame.name}</Text>

            <TouchableOpacity onPress={onMorePress} style={styles.moreBtn}>
                <Text style={styles.moreBtnText}>MORE STATE</Text>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: hp('20%'),
    },
    firstTitle: {
        textAlign: 'center',
        fontFamily: 'Righteous',
        marginBottom: hp('1.5%'),
        color: 'white',
    },
    secondTitle: {
        fontFamily: 'Righteous',
        color: 'white',
        fontSize: wp('5%'),
    },
    moreBtn: {
        width: wp('30%'),
        height: hp('4%'),
        marginTop: hp('8%'),
        borderRadius: 30,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    moreBtnText: {
        fontSize: 9,
        fontFamily: 'RocknRoll One',
    },
});
