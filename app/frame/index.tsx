import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import frames from '../../data/frame/frames';
import CustomText from '@/components/common/CustomText';

const ProductFrameScreen = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < frames.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const selectedFrame = frames[currentIndex];

  return (
    <View style={styles.container}>
      <View style={styles.topSide}>
        <AntDesign onPress={() => router.push('/')} style={styles.close} name="closecircleo" size={40} color="white" />
        <CustomText variant='heading' style={styles.title}>FRAME</CustomText>
      </View>

      <Image style={styles.frame} source={selectedFrame.image} />

      <View style={styles.bottomSide}>
        <View style={styles.slideBtnContainer}>
          <TouchableOpacity onPress={handlePrevious}>
            <AntDesign name="leftcircleo" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext}>
            <AntDesign name="rightcircleo" size={40} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.detailsCon}>
          <CustomText variant='heading' style={styles.firstTitle}>FINALIST</CustomText>
          <Text style={styles.secondTitle}>{selectedFrame.name}</Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            router.push(`/frame/${selectedFrame.id}`)
          }
          style={styles.moreBtn}
        >
          <Text style={styles.moreBtnText}>MORE STATE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  title: {
    fontFamily: 'Rubik-Mono-One',
    color: '#4A4A4A',
    fontSize: wp('24%'),
    alignSelf: 'center',
    marginTop: hp('10%'),
  },
  frame: {
    position: 'absolute',
    zIndex: 1,
    top: hp('32%'),
    marginLeft: hp('10%'),
    width: wp('60%'),
    height: hp('60%'),
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
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Righteous',
    marginBottom: hp('1.5%'),
    color: 'black',
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
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreBtnText: {
    fontSize: 9,
    fontFamily: 'RocknRoll-One',
  },
});

export default ProductFrameScreen;
