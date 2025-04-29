import React, { createContext, useContext, useState } from 'react';

interface CartItem {
    id: number;
    title: string;
    subtitle: string;
    price: number;
    image: any;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    totalAmount: number;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used inside CartProvider');
    }
    return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const clearCart = () => setCartItems([]);

    const addToCart = (newItem: CartItem) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(item => item.id === newItem.id);

            // If item already in cart
            if (existingItemIndex !== -1) {
                const existingItem = prevItems[existingItemIndex];

                // ✅ If quantity is unchanged, do NOT update cart
                if (existingItem.quantity === newItem.quantity) {
                    return prevItems; // no change
                }

                // ✅ If quantity changed ➜ update it
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = {
                    ...existingItem,
                    quantity: newItem.quantity
                };
                return updatedItems;
            }

            // ✅ If item is not in cart ➜ add it
            return [...prevItems, newItem];
        });
    };


    const removeFromCart = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 50); // 50 = Delivery charge

    return (
        <CartContext.Provider value={{ cartItems, addToCart, totalAmount, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
