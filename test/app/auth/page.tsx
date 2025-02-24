"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import DDLCButton from "@/components/Common/Buttons/Button";
import Loading from "@/components/Common/Loading";
import { useAuth } from '@/contexts/AuthContext';
import { CHARACTERS } from '@/constants/characters';
import { Character } from '@/types/character';

type AuthMode = "signin" | "signup";
type AuthField = "email" | "password";

interface AuthError {
  code: string;
  message: string;
}

const AUTH_ERROR_MESSAGES = {
  'auth/email-already-in-use': 'Email already in use. Try logging in instead.',
  'auth/invalid-email': 'Invalid email address.',
  'auth/weak-password': 'Password should be at least 6 characters.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password.',
  'default': 'Something went wrong. Please try again.'
} as const;

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  
  const [mode, setMode] = useState<AuthMode>("signin");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<AuthField | null>(null);

  useEffect(() => {
    if (searchParams.get("mode") === "signup") setMode("signup");
  }, [searchParams]);

  useEffect(() => {
    if (user && !authLoading) router.push('/dashboard');
  }, [user, authLoading, router]);

  const handleInputChange = (field: AuthField) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    setError(''); // Clear error when user types
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error: unknown) {
      const authError = error as AuthError;
      setError(AUTH_ERROR_MESSAGES[authError.code as keyof typeof AUTH_ERROR_MESSAGES] || AUTH_ERROR_MESSAGES.default);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      setError("");
      
      const authFunction = mode === "signup" 
        ? createUserWithEmailAndPassword 
        : signInWithEmailAndPassword;
      
      await authFunction(auth, formData.email, formData.password);
      router.push('/dashboard');
    } catch (error: unknown) {
      const authError = error as AuthError;
      setError(AUTH_ERROR_MESSAGES[authError.code as keyof typeof AUTH_ERROR_MESSAGES] || AUTH_ERROR_MESSAGES.default);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => setMode(prev => prev === "signin" ? "signup" : "signin");

  if (authLoading) return <Loading />;
  if (user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#FFF5F8]"
      style={{ backgroundImage: "url('/images/backgrounds/Menu-Background.png')" }}>
      
      <AnimatePresence>
        {(Object.values(CHARACTERS) as Array<typeof CHARACTERS[keyof typeof CHARACTERS]>).map((character, index) => (
          <motion.img
            key={character.id}
            src={character.chibiPath}
            alt={character.name}
            className={`absolute w-72 h-72 object-contain pointer-events-none ${
              index === 0 ? "left-[1%] top-[15%]" :
              index === 1 ? "left-[10%] bottom-[10%]" :
              index === 2 ? "right-[1%] top-[15%]" :
              "right-[11%] bottom-[10%]"
            }`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          />
        ))}
      </AnimatePresence>

      <motion.div
        className="w-[400px] bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.h1 
          className="text-3xl font-[Riffic] text-pink-700 mb-6 text-center"
          key={mode}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {mode === "signin" ? "Welcome Back!" : "Join the Club!"}
        </motion.h1>
        
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm text-center"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
          {["email", "password"].map((field) => (
            <motion.div 
              key={field}
              className="flex flex-col items-center"
              animate={{ 
                scale: focusedField === field ? 1.02 : 1,
                y: focusedField === field ? -2 : 0
              }}
            >
              <input
                type={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full p-3 rounded-lg bg-white/50 border border-pink-100 focus:border-pink-300 
                  focus:outline-none text-center text-black font-['Halogen'] placeholder:text-pink-300
                  transition-all duration-200"
                value={formData[field as AuthField]}
                onChange={handleInputChange(field as AuthField)}
                onFocus={() => setFocusedField(field as AuthField)}
                onBlur={() => setFocusedField(null)}
              />
            </motion.div>
          ))}
          
          <div className="flex justify-center">
            <DDLCButton 
              label={mode === "signin" ? "Sign In" : "Create Account"}
              onClick={handleEmailAuth}
              disabled={loading}
            />
          </div>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-pink-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white/80 text-pink-600">Or continue with</span>
          </div>
        </div>

        <div className="flex justify-center">
          <DDLCButton 
            label="Continue with Google"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full"
          />
        </div>

        <motion.p 
          className="mt-6 text-center text-sm text-pink-600"
          animate={{ opacity: loading ? 0.5 : 1 }}
        >
          {mode === "signin" ? "New to DDPC? " : "Already have an account? "}
          <button 
            onClick={toggleMode}
            disabled={loading}
            className="text-pink-500 hover:text-pink-600 underline disabled:opacity-50"
          >
            {mode === "signin" ? "Create an account" : "Sign in"}
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
}
