import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, interpolate } from 'react-native-reanimated';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
import { useCart } from '../../contexts/CartContext';
import { useRouter } from 'expo-router';

interface Props {
  frame: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: any;
  };
  isDetailVisible: Animated.SharedValue<number>;
  onClose: () => void;
}

export default function FrameDetails({ frame, isDetailVisible, onClose }: Props) {
  const router = useRouter();
  const { addToCart } = useCart();

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(isDetailVisible.value, [0, 1], [0, 1]),
    transform: [
      {
        translateY: interpolate(isDetailVisible.value, [0, 1], [20, 0]),
      },
    ],
    pointerEvents: isDetailVisible.value === 1 ? 'auto' : 'none',
  }));

  const closeButtonStyle = useAnimatedStyle(() => ({
    opacity: interpolate(isDetailVisible.value, [0, 1], [0, 1]),
    transform: [
      {
        translateY: interpolate(isDetailVisible.value, [0, 1], [20, 0]),
      },
    ],
  }));

  return (
    <>
      {/* Close Button: exact right arrow position */}
      <Animated.View style={[styles.closeWrapper, closeButtonStyle]}>
        <TouchableOpacity onPress={onClose}>
          <AntDesign name="closecircleo" size={40} color="white" />
        </TouchableOpacity>
      </Animated.View>

      {/* Detail Content */}
      <Animated.View style={[styles.detailsCon, animatedStyle]}>
        <Text style={styles.label}>SIZE</Text>
        <Text style={styles.value}>12 X 18</Text>

        <Text style={styles.label}>NAME</Text>
        <Text style={styles.value}>{frame.name}</Text>

        <Text style={styles.label}>DESCRIPTION</Text>
        <Text style={styles.value}>{frame.description}</Text>

        <TouchableOpacity
          onPress={() => {
            addToCart({
              id: frame.id,
              title: frame.name,
              subtitle: frame.description,
              price: frame.price,
              image: frame.image,
              quantity: 1,
            });
            router.push('/cart');
          }}
          style={styles.addBtn}
        >
          <Text style={styles.addBtnText}>ADD TO CART</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  closeWrapper: {
    position: 'absolute',
    top: hp('4%'),
    right: wp('6%'),
    zIndex: 100,
  },
  detailsCon: {
    position: 'absolute',
    top: hp('26%'),
    left: wp('10%'),
  },
  label: {
    fontFamily: 'Righteous',
    color: 'white',
    marginBottom: hp('1%'),
    fontSize: 12,
  },
  value: {
    fontFamily: 'Righteous',
    color: '#FFEC89',
    marginBottom: hp('3.5%'),
    fontSize: 15,
  },
  addBtn: {
    backgroundColor: 'white',
    marginTop: hp('2.5%'),
    width: wp('40%'),
    height: hp('5.5%'),
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnText: {
    fontSize: 13,
    fontFamily: 'RocknRoll One',
    color: 'black',
  },
});
