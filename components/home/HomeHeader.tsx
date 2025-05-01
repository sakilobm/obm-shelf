import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Svg, { Path, Rect } from 'react-native-svg';
import CustomText from '../common/CustomText';
import { useRouter } from 'expo-router';

const HomeHeader: React.FC = () => {
    const router = useRouter();

    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <View style={styles.textWrapper}>
                <CustomText variant="heading">Order From The{'\n'}
                    Best Of <Text style={{ color: '#DBBF2E' }}>Mugs</Text>
                </CustomText>
            </View>
            <TouchableOpacity onPress={() => router.push('/settings')} style={styles.menuButton}>
                <Svg width="69" height="95" viewBox="0 0 69 95" fill="none">
                    <Rect x="2" y="2" width="65" height="91" rx="32.5" fill="white" stroke="#F3F3F3" strokeWidth="6" />
                    <Path d="M27 40L41 40" stroke="black" stroke-width="2" stroke-linecap="round" />
                    <Path d="M22 49H46" stroke="black" stroke-width="2" stroke-linecap="round" />
                    <Path d="M27 58L41 58" stroke="black" stroke-width="2" stroke-linecap="round" />
                </Svg>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textWrapper: {
        flex: 1,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: 32,
    },
    iconButton: {
        backgroundColor: '#FFFFFF',
        margin: 4,
    },
    menuButton: {
        marginTop: 2,
    },
});

export default HomeHeader;
