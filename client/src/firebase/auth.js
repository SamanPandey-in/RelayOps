import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendSignInLinkToEmail as _sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  sendPasswordResetEmail,
  confirmPasswordReset,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { authService } from "./config.js";

const actionCodeSettings = {
  // Redirect back to your auth page; adjust as needed for production
  url: window?.location?.origin + "/auth",
  handleCodeInApp: true,
};

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(authService, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login = async (email, password) => {
    try {
      const cred = await signInWithEmailAndPassword(authService, email, password);
      return { success: true, user: cred.user };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const signup = async ({ fullName, username, email, password }) => {
    try {
      const cred = await createUserWithEmailAndPassword(authService, email, password);
      // try to set display name
      try {
        await updateProfile(cred.user, { displayName: fullName || username || "" });
      } catch (e) {
        // non-fatal
      }
      return { success: true, user: cred.user };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(authService, provider);
      return { success: true, user: result.user };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(authService);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const sendSignInLinkToEmail = async (email) => {
    try {
      await _sendSignInLinkToEmail(authService, email, actionCodeSettings);
      // store email locally so we can finish sign-in when the user opens the link
      try {
        window.localStorage.setItem("emailForSignIn", email);
      } catch {}
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const handleEmailLinkSignIn = async (email, url) => {
    try {
      const link = url || window.location.href;
      if (!isSignInWithEmailLink(authService, link)) {
        return { success: false, error: "Not an email sign-in link" };
      }

      let emailToUse = email;
      try {
        if (!emailToUse) emailToUse = window.localStorage.getItem("emailForSignIn");
      } catch {}

      if (!emailToUse) {
        return { success: false, error: "Missing email for sign-in. Please provide the email used to sign in." };
      }

      const result = await signInWithEmailLink(authService, emailToUse, link);
      try {
        window.localStorage.removeItem("emailForSignIn");
      } catch {}
      return { success: true, user: result.user };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const forgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(authService, email);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const resetPassword = async (oobCode, newPassword) => {
    try {
      await confirmPasswordReset(authService, oobCode, newPassword);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    signup,
    signInWithGoogle,
    logout,
    sendSignInLinkToEmail,
    handleEmailLinkSignIn,
    forgotPassword,
    resetPassword,
  };
};

export { authService, useAuth };
 