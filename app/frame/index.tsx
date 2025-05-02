import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import frames from '../../data/frame/frames'; // Adjust path if needed
import { useCart } from '@/contexts/CartContext';

export default function ProductFrameScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart } = useCart();

  const slideAnim = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;
  const textTranslateX = useRef(new Animated.Value(0)).current;

  const selectedFrame = frames[currentIndex];

  const animateSlide = (direction: 'left' | 'right') => {
    const toValue = direction === 'left' ? -300 : 300;

    // Animate image out
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(textTranslateX, {
        toValue,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Update frame
      setCurrentIndex(prev => {
        const next = direction === 'left' ? prev - 1 : prev + 1;
        return Math.max(0, Math.min(frames.length - 1, next));
      });

      // Reset positions for slide-in
      slideAnim.setValue(-toValue);
      textTranslateX.setValue(-toValue);

      // Animate image/text back in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateX, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };


  return (
    <View style={styles.container}>
      <View style={styles.topSide}>
        <AntDesign onPress={() => router.back()} style={styles.close} name="closecircleo" size={40} color="white" />
        <Text style={styles.tittle}>Frame</Text>
      </View>
      {/* Image - FRAME */}
      <Animated.View style={[styles.frameWrapper, { transform: [{ translateX: slideAnim }] }]}>
        <Image style={styles.frame} source={selectedFrame.image} />
      </Animated.View>

      <View style={styles.bottomSide}>
        {/* LEFT RIGHT Button */}
        <View style={styles.slideBtnContainer}>
          <TouchableOpacity disabled={currentIndex === 0} onPress={() => animateSlide('left')}>
            <AntDesign name="leftcircleo" size={40} color={currentIndex === 0 ? '#999' : 'white'} />
          </TouchableOpacity>
          <TouchableOpacity disabled={currentIndex === frames.length - 1} onPress={() => animateSlide('right')}>
            <AntDesign name="rightcircleo" size={40} color={currentIndex === frames.length - 1 ? '#999' : 'white'} />
          </TouchableOpacity>
        </View>
        {/* FRAME Name */}
        <Animated.View
          style={[
            styles.detailsCon,
            {
              opacity: textOpacity,
              transform: [{ translateX: textTranslateX }],
            },
          ]}
        >
          <Text style={styles.firstTitle}>FINALIST</Text>
          <Text style={styles.secondTitle}>{selectedFrame.name}</Text>
        </Animated.View>
        {/* MORE STATE Button */}
        <View style={styles.buttonsContainer}>

          <TouchableOpacity
            onPress={() => router.push(`/frame/${selectedFrame.id}`)}
            style={styles.secondaryBtn}
          >
            <Text style={styles.secondaryText}>MORE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => {
              addToCart({
                id: selectedFrame.id,
                title: selectedFrame.name,
                subtitle: selectedFrame.description,
                price: Number(selectedFrame.price),
                image: selectedFrame.image,
                quantity: 1,
              });
              router.push('/cart');
            }}
          >
            <Text style={styles.primaryText}>ADD TO CART</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  topSide: {
    width: wp('100%'),
    height: hp('45%'),
    backgroundColor: '#1D1A1A',
  },
  close: {
    alignSelf: 'flex-end',
    top: hp('6%'),
    right: wp('6%'),
  },
  tittle: {
    fontFamily: 'Rubik Mono One',
    color: '#4A4A4A',
    fontSize: wp('20%'),
    alignSelf: 'center',
    marginTop: hp('10%'),
  },
  frameWrapper: {
    position: 'absolute',
    zIndex: 1,
    top: hp('32%'),
    marginLeft: hp('10%'),
    width: wp('60%'),
    height: hp('60%'),
  },
  frame: {
    width: '100%',
    height: '100%',
  },
  bottomSide: {
    backgroundColor: '#0085AF',
    width: wp('100%'),
    height: hp('65%'),
  },
  slideBtnContainer: {
    marginTop: hp('3%'),
    marginHorizontal: hp('3%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsCon: {
    alignSelf: 'center',
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },
  primaryBtn: {
    width: wp('30%'),
    height: hp('4%'),
    borderRadius: 30,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  secondaryBtn: {
    width: wp('30%'),
    height: hp('4%'),
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  moreBtn: {
    width: wp('30%'),
    height: hp('4%'),
    borderRadius: 30,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    marginTop: hp('8%'),
  },
  secondaryText: {
    fontSize: 9,
    fontFamily: 'RocknRoll One',
    color: '#fff',
  },
  primaryText: {
    fontSize: 9,
    fontFamily: 'RocknRoll One',
  },
}); 