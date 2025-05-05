import React, { createContext, useContext, useState } from 'react';

interface WishlistItem {
    id: number;
    productType: string;
    title: string;
    subtitle: string;
    price: number;
    image: any;
}

interface WishlistContextType {
    wishlistItems: WishlistItem[];
    addToWishlist: (item: WishlistItem) => void;
    removeFromWishlist: (id: number, productType: string) => void;
    clearWishlist: () => void;
    isInWishlist: (id: number, productType: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used inside WishlistProvider');
    }
    return context;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

    const addToWishlist = (item: WishlistItem) => {
        setWishlistItems(prev => {
            const exists = prev.some(
                i => i.id === item.id && i.productType === item.productType
            );
            if (exists) return prev;
            return [...prev, item];
        });
    };

    const removeFromWishlist = (id: number, productType: string) => {
        setWishlistItems(prev =>
            prev.filter(item => !(item.id === id && item.productType === productType))
        );
    };

    const clearWishlist = () => setWishlistItems([]);

    const isInWishlist = (id: number, productType: string) => {
        return wishlistItems.some(item => item.id === id && item.productType === productType);
    };

    return (
        <WishlistContext.Provider
            value={{ wishlistItems, addToWishlist, removeFromWishlist, clearWishlist, isInWishlist }}
        >
            {children}
        </WishlistContext.Provider>
    );
};
