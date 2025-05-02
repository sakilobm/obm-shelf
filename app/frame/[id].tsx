import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useCart } from '../../contexts/CartContext';
import frames from '../../data/frame/frames';

const ProductFrameDetailScreen = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { addToCart } = useCart();

    const frame = frames.find(f => f.id === Number(id));
    // const frame = frames.find(f => f.key === id);
    if (!frame) return null;

    return (
        <View style={styles.container}>
            <View style={styles.topSide}>
                <Text style={styles.tittle}>Frame</Text>
            </View>

            <Image style={styles.frame} source={frame.image} />

            <View style={styles.bottomSide}>
                <AntDesign onPress={() => router.back()} style={styles.close} name="closecircleo" size={40} color="white" />

                <View style={styles.detailsCon}>
                    <Text style={styles.label}>Size</Text>
                    <Text style={styles.firstTitle}>{frame.size}</Text>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.firstTitle}>{frame.name}</Text>
                    <Text style={styles.label}>Price</Text>
                    <Text style={styles.firstTitle}>₹ {frame.price}</Text>
                </View>

                <TouchableOpacity
                    style={styles.moreBtn}
                    onPress={() => {
                        addToCart({
                            id: frame.id,
                            title: frame.name,
                            subtitle: frame.description,
                            price: Number(frame.price),
                            image: frame.image,
                            quantity: 1,
                        });
                        router.push('/cart');
                    }}
                >
                    <Text style={styles.addToCart}>ADD TO CART</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {},
    topSide: {
        width: wp('100%'),
        height: hp('45%'),
        backgroundColor: '#1D1A1A',
    },
    tittle: {
        fontFamily: 'Rubik Mono One',
        color: '#4A4A4A',
        fontSize: wp('20%'),
        alignSelf: 'center',
        marginTop: hp('15%'),
    },
    frame: {
        position: 'absolute',
        zIndex: 1,
        top: hp('32%'),
        marginLeft: hp('-10%'),
        width: wp('60%'),
        height: hp('60%'),
    },
    bottomSide: {
        backgroundColor: '#0085AF',
        width: wp('100%'),
        height: hp('65%'),
    },
    close: {
        alignSelf: 'flex-end',
        marginTop: hp('8%'),
        marginRight: wp('5%'),
    },
    detailsCon: {
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: hp('1%'),
        gap: hp('3%'),
    },
    label: {
        fontFamily: 'Righteous',
        fontSize: 16,
        color: 'white',
    },
    firstTitle: {
        fontFamily: 'Raleway-Bold',
        color: 'white',
        fontSize: 14,
    },
    moreBtn: {
        width: wp('40%'),
        height: hp('5%'),
        marginTop: hp('4%'),
        borderRadius: 30,
        backgroundColor: 'white',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addToCart: {
        fontSize: 10,
        fontFamily: 'RocknRoll One',
    },
});

export default ProductFrameDetailScreen;
