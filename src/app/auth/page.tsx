"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import DDLCButton from "@/components/Common/Buttons/Button";
import Loading from "@/components/Common/Loading";
import { useAuth } from '@/contexts/AuthContext';

type AuthMode = "signin" | "signup";

interface AuthError {
  code: string;
  message: string;
}

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();

  // Set initial mode based on URL parameter
  useEffect(() => {
    const initialMode = searchParams.get("mode");
    if (initialMode === "signup") {
      setMode("signup");
    }
  }, [searchParams]);

  useEffect(() => {
    if (user && !authLoading) {
      router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error: unknown) {
      const authError = error as AuthError;
      setError(authError.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      setLoading(true);
      if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/dashboard');
    } catch (error: unknown) {
      const authError = error as AuthError;
      if (authError.code === 'auth/email-already-in-use') {
        setError('Email already in use. Try logging in instead.');
      } else if (authError.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else if (authError.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError('Failed to create an account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleEmailAuth(e as unknown as React.FormEvent);
  };

  const chibis = [
    { src: "/images/chibi_sprites/Sayori-Chibi-HC.png", position: "left-[1%] top-[15%]" },
    { src: "/images/chibi_sprites/Yuri-Chibi-HC.png", position: "left-[10%] bottom-[10%]" },
    { src: "/images/chibi_sprites/Natsuki-Chibi-HC.png", position: "right-[1%] top-[15%]" },
    { src: "/images/chibi_sprites/Monika-Chibi-HC.png", position: "right-[11%] bottom-[10%]" }
  ];

  if (authLoading) {
    return <Loading />;
  }

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ 
        backgroundImage: "url('/images/backgrounds/polkadot-pink.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#FFF5F8"
      }}>
      
      {/* Decorative Chibis */}
      <AnimatePresence>
        {chibis.map((chibi, index) => (
          <motion.img
            key={chibi.src}
            src={chibi.src}
            alt="Decorative character"
            className={`absolute w-72 h-72 object-contain pointer-events-none ${chibi.position}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: index * 0.2,
              duration: 0.5,
              ease: "easeOut"
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main Auth Form */}
      <motion.div
        className="w-[400px] bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-[Riffic] text-pink-700 mb-6 text-center">
          {mode === "signin" ? "Welcome Back!" : "Join the Club!"}
        </h1>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
          <div className="flex flex-col items-center">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-white/50 border border-pink-100 focus:border-pink-300 focus:outline-none text-center
                text-black font-['Halogen'] placeholder:text-pink-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-white/50 border border-pink-100 focus:border-pink-300 focus:outline-none text-center
                text-black font-['Halogen'] placeholder:text-pink-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <DDLCButton 
              label={mode === "signin" ? "Sign In" : "Create Account"}
              onClick={handleButtonClick}
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

        <p className="mt-6 text-center text-sm text-pink-600">
          {mode === "signin" ? (
            <>
              New to DDPC?{" "}
              <button 
                onClick={() => setMode("signup")}
                className="text-pink-500 hover:text-pink-600 underline"
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button 
                onClick={() => setMode("signin")}
                className="text-pink-500 hover:text-pink-600 underline"
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </motion.div>
    </div>
  );
}
