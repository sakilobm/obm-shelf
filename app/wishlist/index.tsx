import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useWishlist } from '../../contexts/WishlistContext';
import CustomText from '../../components/common/CustomText';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../contexts/CartContext';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const { width } = Dimensions.get('window');

export default function WishlistScreen() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const router = useRouter();

  return (
    <View style={styles.page}>

      {/* HEADER */}
      <View style={styles.header}>
        <CustomText variant="heading" style={{ color: 'black' }}>
          Wishlist
        </CustomText>
        <View style={styles.cartCountBubble}>
          <CustomText variant="small" style={{ color: 'black', fontSize: 14, }}>
            {wishlistItems.length}
          </CustomText>
        </View>
      </View>

      {/* BLACK BottomSheet container */}
      <View style={styles.cartContainer}>
        <FlatList
          data={wishlistItems}
          keyExtractor={(item) => `${item.productType}-${item.id}`}
          contentContainerStyle={styles.cartList}

          renderItem={({ item }) => {
            const renderRightActions = () => (
              <TouchableOpacity
                onPress={() => removeFromWishlist(item.id, item.productType)}
                style={styles.deleteButton}
              >
                <Ionicons name="trash" size={24} color="white" />
              </TouchableOpacity>
            );

            return (
              <Swipeable renderRightActions={renderRightActions}>
                <TouchableOpacity onPress={() => router.push('/mug')}>
                  <View style={styles.cartItem}>
                    <View style={styles.imageWrapper}>
                      <Image source={item.image} style={styles.cartItemImage} resizeMode="cover" />
                    </View>
                    <View style={styles.cartItemDetails}>
                      <CustomText variant="subheading" style={{ color: 'white' }}>
                        {item.title}
                      </CustomText>
                      <CustomText variant="small" style={{ color: 'gray', marginTop: 2 }}>
                        {item.subtitle}
                      </CustomText>
                    </View>
                  </View>
                </TouchableOpacity>
              </Swipeable>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white', // Whole page white background
  },
  header: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingTop: 50,
    marginBottom: 20,
  },
  cartCountBubble: {
    backgroundColor: '#FFEC89',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 30,
  },
  cartContainer: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  cartList: {
    paddingBottom: 80,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 20,
  },
  imageWrapper: {
    height: 50,
    width: 50,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginRight: 12,
  },
  cartItemImage: {
    height: '100%',
    width: '100%',
  },
  cartItemDetails: {
    flex: 1,
  },
  priceBubble: {
    backgroundColor: '#FFEC89',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summarySection: {
    width: '100%',
    backgroundColor: '#FFEC89',
    padding: 16,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  deliveryRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#1A1A1A',
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  totalImage: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  paymentButton: {
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: 'white',
    width: width * 0.85,
    height: 85,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 24,
  },

  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  btnText: {
    fontSize: 20,
    fontFamily: 'Raleway-Bold',
    color: 'black',
    marginLeft: width * 0.1,
  },

  btnIcon: {
    width: 70,
    height: 70,
  },

  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
    width: 70,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },

});