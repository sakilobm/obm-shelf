import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';

interface Props {
    width?: number;
}

const MugProductCard: React.FC<Props> = ({ width = 300 }) => {
    const { colors } = useTheme();

    return (
        <View style={[styles.card, { width }]}>
            <Image
                source={{ uri: 'https://source.unsplash.com/featured/?mug' }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.textWrapper}>
                <Text variant="titleLarge">Double Color</Text>
                <Text variant="bodyMedium">Coffee Cup</Text>
                <Text style={styles.price}>₹719.00</Text>
                <Button icon="cart" mode="contained" onPress={() => { }}>
                    Add
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        overflow: 'hidden',
        marginVertical: 20,
        backgroundColor: '#f8f8f8',
        alignSelf: 'center',
    },
    image: {
        height: 200,
        width: '100%',
    },
    textWrapper: {
        padding: 16,
    },
    price: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MugProductCard;
