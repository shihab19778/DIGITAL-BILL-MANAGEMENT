// src/Provider/AuthProvider.jsx

import React, { createContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile
} from "firebase/auth";
import { auth } from '../Firebase.init';
import toast from 'react-hot-toast';

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [balance, setBalance] = useState(() => {
        // Initialize balance from localStorage or default to 10000
        const savedBalance = localStorage.getItem('userBalance');
        return savedBalance ? parseFloat(savedBalance) : 10000;
    });

    // Update localStorage whenever balance changes
    useEffect(() => {
        localStorage.setItem('userBalance', balance.toString());
    }, [balance]);

    // Register new user
    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Login user
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Google sign in
    const googleSignIn = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            // Store user data in context
            setUser(result.user);
            return result;
        } catch (error) {
            console.error("Google Sign In Error:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Update user profile
    const updateUserProfile = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        });
    };

    // Reset password - simplified without email verification
    const resetPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email)
            .finally(() => {
                setLoading(false);
            });
    };

    // Logout user
    const logoutUser = () => {
        setLoading(true);
        return signOut(auth);
    };
    
    // Pay bill
    const payBill = (amount) => {
        const currentBalance = parseFloat(localStorage.getItem('userBalance')) || balance;
        
        if (currentBalance >= amount) {
            const newBalance = currentBalance - amount;
            setBalance(newBalance);
            localStorage.setItem('userBalance', newBalance.toString());
            return { success: true, message: "Bill paid successfully" };
        } else {
            return { success: false, message: "Insufficient balance" };
        }
    };

    // Monitor auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        balance,
        registerUser,
        loginUser,
        googleSignIn,
        updateUserProfile,
        resetPassword,
        logoutUser,
        payBill
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;