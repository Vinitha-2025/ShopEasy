import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // ========================================
  // WATCH FIREBASE LOGIN / LOGOUT
  // ========================================

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setCurrentUser(user);
        setAuthLoading(false);

        if (user) {
          // Each customer gets their own cart
          const cartKey = `shopEasyCart_${user.uid}`;

          const savedCart =
            localStorage.getItem(cartKey);

          setCartItems(
            savedCart
              ? JSON.parse(savedCart)
              : []
          );
        } else {
          // Clear cart when logged out
          setCartItems([]);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  // ========================================
  // SAVE CART FOR CURRENT CUSTOMER
  // ========================================

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!currentUser) {
      return;
    }

    const cartKey = `shopEasyCart_${currentUser.uid}`;

    localStorage.setItem(
      cartKey,
      JSON.stringify(cartItems)
    );
  }, [
    cartItems,
    currentUser,
    authLoading,
  ]);

  // ========================================
  // ADD PRODUCT TO CART
  // ========================================

  const addToCart = (product) => {
    if (!currentUser) {
      return;
    }

    setCartItems((currentItems) => {
      const existingItem =
        currentItems.find(
          (item) =>
            item._id === product._id
        );

      if (existingItem) {
        return currentItems.map(
          (item) =>
            item._id === product._id
              ? {
                  ...item,
                  quantity:
                    item.quantity + 1,
                }
              : item
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // ========================================
  // REMOVE PRODUCT
  // ========================================

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) =>
          item._id !== productId
      )
    );
  };

  // ========================================
  // INCREASE QUANTITY
  // ========================================

  const increaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item._id === productId
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  };

  // ========================================
  // DECREASE QUANTITY
  // ========================================

  const decreaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item._id === productId
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  };

  // ========================================
  // CART COUNT
  // ========================================

  const cartCount = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};