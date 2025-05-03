import React from 'react';
import { Text as RNText, StyleSheet, TextStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

interface CustomTextProps {
    children: React.ReactNode;
    variant?: 'heading' | 'subheading' | 'body' | 'small';
    style?: TextStyle;
}

const fontSizes = {
    heading: 28,
    subheading: 20,
    body: 16,
    small: 12,
};

const colorStyles = {
    primary: 'black',
    secondary: 'black',
    body: 'black',
    small: 'black',
};

const fontWeight = {
    heading: 'bold' as TextStyle['fontWeight'],
    subheading: '500' as TextStyle['fontWeight'],
    body: '400' as TextStyle['fontWeight'],
    small: '400' as TextStyle['fontWeight'],
};

const fontFamilies = {
    heading: 'Raleway-Bold',
    subheading: 'Raleway-Medium',
    body: 'Raleway-Regular',
    small: 'Righteous',
};

const CustomText: React.FC<CustomTextProps> = ({
    children,
    variant = 'body',
    style,
}) => {
    const { colors } = useTheme();

    return (
        <RNText
            style={[
                {
                    color: colors.onBackground,
                    fontSize: fontSizes[variant],
                    fontFamily: fontFamilies[variant],
                    fontWeight: fontWeight[variant]
                },
                style,
            ]}
        >
            {children}
        </RNText>
    );
};

export default CustomText;
