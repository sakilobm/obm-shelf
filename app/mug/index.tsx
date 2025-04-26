import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import CustomText from '../../components/common/CustomText';
import mugs from '../../data/mug/mugs';

const { width } = Dimensions.get('window');

export default function ProductMugScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [currentMugIndex, setCurrentMugIndex] = useState(0);

  const handleIncrease = () => setQuantity((q) => q + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const handleScroll = (event: any) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentMugIndex(slide);
    setQuantity(1); // Reset quantity on changing mug
  };

  const selectedMug = mugs[currentMugIndex];

  const getNumericPrice = (priceString: string) => {
    return parseFloat(priceString.replace(/[^\d.]/g, ''));
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle" size={36} color="black" />
      </TouchableOpacity>

      {/* Mug Scroll */}
      <FlatList
        data={mugs}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={styles.imageWrapper}>
            <Image source={item.image} style={styles.mugImage} resizeMode="contain" />
          </View>
        )}
      />

      {/* Title & Subtitle */}
      <View style={styles.titleSection}>
        <CustomText variant="heading">
          {selectedMug.title.split(' ')[0]}{' '}
          <CustomText variant="heading" style={{ fontWeight: '900' }}>
            {selectedMug.title.split(' ')[1]}
          </CustomText>
        </CustomText>
        <CustomText variant="small" style={{ color: 'gray', marginTop: 4 }}>
          {selectedMug.category}
        </CustomText>
      </View>

      {/* Quantity Controls */}
      <View style={styles.quantityRow}>
        <TouchableOpacity onPress={handleDecrease}>
          <Ionicons name="remove-circle-outline" size={40} color="black" />
        </TouchableOpacity>

        <CustomText variant="heading" style={{ marginHorizontal: 20 }}>
          {quantity.toString().padStart(2, '0')}
        </CustomText>

        <TouchableOpacity onPress={handleIncrease}>
          <Ionicons name="add-circle-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>

      {/* Price Tag */}
      <View style={styles.priceTag}>
        <CustomText variant="subheading">₹ {(getNumericPrice(selectedMug.price) * quantity).toFixed(2)}</CustomText>
      </View>

      {/* Add to Cart */}
      <TouchableOpacity onPress={() => router.push('/cart/index')} style={styles.addToCartButton}>
        <CustomText variant="subheading" style={{ color: 'black' }}>
          Add To Cart
        </CustomText>
        <Ionicons name="cart" size={24} color="black" style={{ marginLeft: 8 }} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  imageWrapper: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mugImage: {
    width: width * 0.7,
    height: width * 0.7,
  },
  titleSection: {
    marginTop: 30,
    alignItems: 'center',
  },
  quantityRow: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceTag: {
    backgroundColor: '#FFEC89',
    paddingHorizontal: 32,
    paddingVertical: 8,
    borderRadius: 30,
    marginTop: 20,
  },
  addToCartButton: {
    marginTop: 30,
    backgroundColor: '#FFEC89',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 40,
  },
});
