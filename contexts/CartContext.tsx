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
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    totalAmount: number;
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

    const addToCart = (item: Omit<CartItem, 'quantity'>) => {
        setCartItems((prev) => {
            const exist = prev.find((i) => i.id === item.id);
            if (exist) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 50); // 50 = Delivery charge

    return (
        <CartContext.Provider value={{ cartItems, addToCart, totalAmount }}>
            {children}
        </CartContext.Provider>
    );
};
