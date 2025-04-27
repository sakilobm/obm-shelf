import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import CustomText from '../../components/common/CustomText';
import mugs from '../../data/mug/mugs';
import { useCart } from '../../contexts/CartContext';

const { width } = Dimensions.get('window');

export default function ProductMugScreen() {
  const { addToCart } = useCart();
  const { colors } = useTheme();
  const router = useRouter();

  const [quantities, setQuantities] = useState<{ [id: number]: number }>({});
  const [currentMugIndex, setCurrentMugIndex] = useState(0);

  const handleScroll = (event: any) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentMugIndex(slide);
  };

  const handleIncrease = () => {
    const currentId = mugs[currentMugIndex].id;
    setQuantities((prev) => ({
      ...prev,
      [currentId]: (prev[currentId] || 1) + 1,
    }));
  };

  const handleDecrease = () => {
    const currentId = mugs[currentMugIndex].id;
    setQuantities((prev) => {
      const currentQty = prev[currentId] || 1;
      if (currentQty > 1) {
        return {
          ...prev,
          [currentId]: currentQty - 1,
        };
      }
      return prev;
    });
  };

  const selectedMug = mugs[currentMugIndex];
  const selectedQuantity = quantities[selectedMug.id] || 1;

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle" size={36} color="black" />
      </TouchableOpacity>

      {/* Mug Scroll */}
      <FlatList
        data={mugs}
        keyExtractor={(item) => item.id.toString()}
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
          {selectedQuantity.toString().padStart(2, '0')}
        </CustomText>

        <TouchableOpacity onPress={handleIncrease}>
          <Ionicons name="add-circle-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>

      {/* Price Tag */}
      <View style={styles.priceTag}>
        {/* TODO 779 Price Not Showing We should Fix That */}
        <CustomText variant="subheading">₹ {(selectedMug.price * selectedQuantity).toFixed(2)} </CustomText>
      </View>

      {/* Add to Cart */}
      <TouchableOpacity onPress={() => {
        addToCart({
          id: selectedMug.id,
          title: selectedMug.title,
          subtitle: selectedMug.category,
          price: selectedMug.price,
          image: selectedMug.image,
        });
        router.push('/cart')
      }}
        style={styles.addToCartButton}>
        <CustomText variant="subheading" style={{ color: 'black' }}>
          Add To Cart
        </CustomText>
        <Ionicons name="cart" size={24} color="black" style={{ marginLeft: 8 }} />
      </TouchableOpacity>
    </View >
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
