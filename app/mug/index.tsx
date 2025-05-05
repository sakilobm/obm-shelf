import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import CustomText from '../../components/common/CustomText';
import mugs from '../../data/mug/mugs';
import { useCart } from '../../contexts/CartContext';
import Svg, { Path, Rect } from 'react-native-svg';

const { width } = Dimensions.get('window');
export default function ProductMugScreen() {
  const { addToCart } = useCart();
  const { colors } = useTheme();
  const router = useRouter();

  const [quantities, setQuantities] = useState<{ [id: number]: number }>({});
  const [selectedMugs, setSelectedMugs] = useState<{ [id: number]: boolean }>({});
  const [currentMugIndex, setCurrentMugIndex] = useState(0);

  const selectedMug = mugs[currentMugIndex];
  const selectedQuantity = quantities[selectedMug.id] || 1;
  const isSelected = selectedMugs[selectedMug.id] || false;

  const handleScroll = (event: any) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentMugIndex(slide);
  };

  const handleIncrease = () => {
    const currentId = mugs[currentMugIndex].id;

    if (!selectedMugs[currentId]) {
      toggleSelectMug(currentId)
    }

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

  const toggleSelectMug = (mugId: number) => {
    setSelectedMugs((prev) => ({
      ...prev,
      [mugId]: !prev[mugId],
    }));
  };

  const handleAddSelectedToCart = () => {
    let atLeastOneAdded = false;

    if (isSelected) {
      Object.keys(selectedMugs).forEach((id) => {
        if (selectedMugs[Number(id)]) {
          const mug = mugs.find((m) => m.id === Number(id));
          if (mug) {
            addToCart({
              id: mug.id,
              productType: 'mug',
              title: mug.title,
              subtitle: mug.category,
              price: Number(mug.price),
              image: mug.image,
              quantity: quantities[mug.id] || 1,
            });
            atLeastOneAdded = true;
          }
        }
      });
    }

    const currentMug = mugs[currentMugIndex];
    const isCurrentSelected = selectedMugs[currentMug.id] || false;

    if (!isCurrentSelected) {
      addToCart({
        id: currentMug.id,
        productType: 'mug',
        title: currentMug.title,
        subtitle: currentMug.category,
        price: Number(currentMug.price),
        image: currentMug.image,
        quantity: quantities[currentMug.id] || 1,
      });
      atLeastOneAdded = true;
    }

    if (!atLeastOneAdded) {
      alert('Please select or scroll to a mug to add.');
      return;
    }

    router.push('/cart');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mugHeader}>
        {/* Title & Subtitle */}
        <View style={styles.titleSection}>
          <CustomText variant="subheading" style={{ fontSize: 30, lineHeight: 38 }}>
            {selectedMug.title.split(' ')[0]}{'\n'}
            <CustomText variant="heading" style={{ fontWeight: 'bold', fontSize: 30 }}>
              {selectedMug.title.split(' ')[1]}
            </CustomText>
          </CustomText>
          <CustomText variant="body" style={{ color: 'gray', marginLeft: 5 }}>
            {selectedMug.category}
          </CustomText>
        </View>

        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()}>
          <Svg width="69" height="95" viewBox="0 0 69 95" fill="none">
            <Rect x="2" y="2" width="65" height="91" rx="32.5" fill="white" stroke="#F3F3F3" strokeWidth="6" />
            <Path id="Vector" d="M38.1123 37.1641C38.5907 36.7874 39.295 36.8139 39.7412 37.2441C40.1755 37.6632 40.2153 38.3212 39.8594 38.7842L39.8555 38.79L39.7471 38.9111L39.7422 38.916L39.6719 38.8438L39.7412 38.916L30.8457 47.5L39.7412 56.084L39.8184 56.165C40.1794 56.5843 40.1931 57.189 39.8594 57.623L39.8555 57.6289L39.7471 57.75L39.7422 57.7559L39.6719 57.6836L39.7412 57.7559C39.3083 58.1733 38.6327 58.2103 38.1562 57.8691L38.1504 57.8652L38.0254 57.7607L38.0195 57.7559L28.2588 48.3359C27.8245 47.9168 27.7847 47.2589 28.1406 46.7959L28.1445 46.79L28.2529 46.6699L28.2578 46.6641L28.3281 46.7363L28.2588 46.6641L38.0195 37.2441L38.1123 37.1641Z" fill="black" stroke="black" stroke-width="0.2" />
          </Svg>
        </TouchableOpacity>
      </View>

      {/* Mug Scroll */}
      <FlatList
        data={mugs}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => {
          const itemIsSelected = selectedMugs[item.id] || false;
          return (
            <View style={styles.imageWrapper}>
              <Image source={item.image} style={styles.mugImage} resizeMode="contain" />
              {/* Select Button */}
              <TouchableOpacity
                onPress={() => toggleSelectMug(item.id)}
                style={[styles.selectButton, itemIsSelected && styles.selected]}
              >
                <Ionicons name={itemIsSelected ? "checkmark-circle" : "ellipse-outline"} size={30} color="black" />
              </TouchableOpacity>
            </View>
          );
        }}
      />

      {/* Quantity Controls */}
      <View style={styles.quantityRow}>
        <TouchableOpacity onPress={handleDecrease}>
          {/* <Image source={require('../../assets/png/minus_button.png')} style={{ width: 40, height: 40 }} /> */}
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
        <CustomText variant="subheading" style={{ marginTop: -5, }}>
          ₹ {((Number(selectedMug.price) || 0) * selectedQuantity).toFixed(2)}
        </CustomText>
      </View>

      {/* Add to Cart */}
      <TouchableOpacity onPress={handleAddSelectedToCart}
        style={styles.addToCartButton}>
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
  mugHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  backButton: {

  },
  imageWrapper: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mugImage: {
    width: width * 1.3,
    height: width * 1.3,
  },
  selectButton: {
    position: 'absolute',
    top: 20,
    right: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    zIndex: 10,
  },
  selected: {
    backgroundColor: '#FFEC89',
  },
  titleSection: {
    // position: 'absolute',
    // top: 50,
    // left: 20,
    // zIndex: 10,
    // marginTop: 30,
    // alignItems: 'center',
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
