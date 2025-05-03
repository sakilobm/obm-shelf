import React, { createContext, useContext, useState } from 'react';

interface WishlistItem {
    id: number;
    title: string;
    subtitle: string;
    price: number;
    image: any;
}

interface WishlistContextType {
    wishlistItems: WishlistItem[];
    addToWishlist: (item: WishlistItem) => void;
    removeFromWishlist: (id: number) => void;
    clearWishlist: () => void;
    isInWishlist: (id: number) => boolean;
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
            if (prev.find(i => i.id === item.id)) return prev;
            return [...prev, item];
        });
    };

    const removeFromWishlist = (id: number) => {
        setWishlistItems(prev => prev.filter(item => item.id !== id));
    };

    const clearWishlist = () => setWishlistItems([]);

    const isInWishlist = (id: number) => {
        return wishlistItems.some(item => item.id === id);
    };

    return (
        <WishlistContext.Provider
            value={{ wishlistItems, addToWishlist, removeFromWishlist, clearWishlist, isInWishlist }}
        >
            {children}
        </WishlistContext.Provider>
    );
};
