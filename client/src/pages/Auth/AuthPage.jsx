import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Zap, ArrowLeft, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import { useAuth } from '../../firebase/auth';
import { Logo } from '../../components';
import ForgotPassword from './ForgotPassword';

export default function AuthPage() {
  const navigate = useNavigate();
  const { login, signup, signInWithGoogle, sendSignInLinkToEmail, handleEmailLinkSignIn } = useAuth();
  const auth = getAuth();

  const [authMode, setAuthMode] = useState('login'); // 'login', 'signup', 'forgot', 'emailsignin'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = (email) => email === "" || emailRegex.test(email);

  /* ---------------- LOGIN ---------------- */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(loginData.email, loginData.password);
      if (result.success) navigate("/dashboard");
      else setError(result.error || "Invalid credentials");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- SIGNUP ---------------- */
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (signupData.password !== signupData.confirmPassword) {
      return setError("Passwords do not match");
    }
    if (signupData.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    setLoading(true);
    try {
      const result = await signup(signupData);
      if (result.success) navigate("/dashboard");
      else setError(result.error || "Signup failed");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- FORGOT PASSWORD ---------------- */
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, loginData.email);
      setSuccessMsg("Password reset email sent! Check your inbox.");
      setLoginData({ email: "", password: "" });
    } catch (error) {
      console.error(error.message);
      setError(error.message || "Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- EMAIL LINK SIGNIN ---------------- */
  const handleSendEmailSignInLink = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await sendSignInLinkToEmail(loginData.email);
      if (res.success) {
        setSuccessMsg("Sign-in link sent! Check your inbox.");
        setLoginData({ email: "", password: "" });
      } else {
        setError(res.error || "Failed to send sign-in link. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Failed to send sign-in link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* Automatically handle incoming email-link sign-ins */
  useEffect(() => {
    const tryCompleteEmailLink = async () => {
      const res = await handleEmailLinkSignIn();
      if (res.success) {
        navigate('/dashboard');
        return;
      }

      if (res.error && res.error.toLowerCase().includes('missing email')) {
        const prompted = window.prompt('Enter the email you used to sign in:');
        if (prompted) {
          const res2 = await handleEmailLinkSignIn(prompted);
          if (res2.success) navigate('/dashboard');
          else setError(res2.error || 'Email link sign-in failed');
        }
      }
    };

    tryCompleteEmailLink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate("/dashboard");
    } catch {
      setError("Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] px-4 font-sans selection:bg-cyan-500/30">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-[1000px] min-h-[650px] flex rounded-[2.5rem] overflow-hidden bg-zinc-900/40 border border-white/5 backdrop-blur-2xl shadow-2xl"
      >
        {/* Left Side: Dynamic Forms */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
          <AnimatePresence mode="wait">
            {authMode === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back</h1>
                  <p className="text-zinc-400 mt-2">Resume your team's relay.</p>
                </div>

                {error && authMode === 'login' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                  >
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <AuthInput
                    label="Email"
                    icon={<Mail size={18} />}
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  />
                  <AuthInput
                    label="Password"
                    icon={<Lock size={18} />}
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  />

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('forgot');
                        setError("");
                        setSuccessMsg("");
                      }}
                      className="text-xs text-cyan-500 hover:text-cyan-400 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <AuthButton loading={loading} disabled={!isEmailValid(loginData.email) || loginData.password === ""}>Sign In</AuthButton>
                </form>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-2 text-zinc-500">Or continue with</span></div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 10.8v3.6h5.1c-.2 1.3-1.5 3.8-5.1 3.8A6 6 0 1 1 12 6c1.7 0 2.9.7 3.6 1.3l2.4-2.3C16.5 3.6 14.4 2.5 12 2.5A9.5 9.5 0 1 0 21.5 12c0-.6-.1-1.1-.2-1.7H12z" />
                  </svg>
                  Google
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('emailsignin');
                    setError("");
                    setSuccessMsg("");
                  }}
                  className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-sm font-medium"
                >
                  Sign in with Email Link
                </button>
              </motion.div>
            )}

            {authMode === 'signup' && (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <h1 className="text-3xl font-bold text-white tracking-tight">Create Account</h1>
                  <p className="text-zinc-400 mt-2">Join us and unlock all features</p>
                </div>

                {error && authMode === 'signup' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                  >
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <AuthInput label="Full Name" icon={<User size={18} />} value={signupData.fullName} onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })} />
                    <AuthInput label="Username" icon={<User size={18} />} value={signupData.username} onChange={(e) => setSignupData({ ...signupData, username: e.target.value })} />
                  </div>
                  <AuthInput label="Email" icon={<Mail size={18} />} type="email" value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} />
                  <AuthInput label="Password" icon={<Lock size={18} />} type="password" value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} />
                  <AuthInput label="Confirm Password" icon={<Lock size={18} />} type="password" value={signupData.confirmPassword} onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })} />

                  <AuthButton loading={loading} disabled={!isEmailValid(signupData.email) || signupData.password === ""}>Get Started</AuthButton>
                </form>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-2 text-zinc-500">Or continue with</span></div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 10.8v3.6h5.1c-.2 1.3-1.5 3.8-5.1 3.8A6 6 0 1 1 12 6c1.7 0 2.9.7 3.6 1.3l2.4-2.3C16.5 3.6 14.4 2.5 12 2.5A9.5 9.5 0 1 0 21.5 12c0-.6-.1-1.1-.2-1.7H12z" />
                  </svg>
                  Google
                </button>
              </motion.div>
            )}

            {authMode === 'forgot' && (
              <ForgotPassword
                loginData={loginData}
                setLoginData={setLoginData}
                handleForgotPassword={handleForgotPassword}
                loading={loading}
                error={error}
                successMsg={successMsg}
                setAuthMode={setAuthMode}
                setError={setError}
                setSuccessMsg={setSuccessMsg}
                isEmailValid={isEmailValid}
                AuthInput={AuthInput}
                AuthButton={AuthButton}
              />
            )}

            {authMode === 'emailsignin' && (
              <motion.div
                key="emailsignin"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setError("");
                    setSuccessMsg("");
                  }}
                  className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm"
                >
                  <ArrowLeft size={16} /> Back to Login
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-white">Sign In with Email Link</h1>
                  <p className="text-zinc-400 mt-2">Enter your email to receive a sign-in link.</p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                  >
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleSendEmailSignInLink} className="space-y-4">
                  <AuthInput
                    label="Email"
                    icon={<Mail size={18} />}
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  />
                  <AuthButton loading={loading} disabled={!isEmailValid(loginData.email)}>Send Sign-In Link</AuthButton>
                  {successMsg && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-cyan-400 text-sm text-center"
                    >
                      {successMsg}
                    </motion.p>
                  )}
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Brand Panel */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-cyan-600 to-blue-700 p-12 flex-col justify-between relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

          <div className="relative z-10 flex items-center gap-2">
            <Logo />
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white leading-tight">
              {authMode === 'signup' ? "Ready to join the race?" : "The central nervous system for teams."}
            </h2>
            <p className="mt-4 text-cyan-100/80 leading-relaxed">
              Experience proactive orchestration that catches potential issues early and keeps your team aligned.
            </p>

            <button
              onClick={() => {
                setAuthMode(authMode === 'signup' ? 'login' : authMode === 'login' ? 'signup' : 'login');
                setError("");
                setSuccessMsg("");
              }}
              className="mt-8 px-8 py-3 rounded-full border border-white/20 bg-white/10 text-white font-bold hover:bg-white hover:text-cyan-600 transition-all"
            >
              {authMode === 'login' || authMode === 'forgot' || authMode === 'emailsignin' ? "Create an account" : "Sign in instead"}
            </button>
          </div>

          <div className="relative z-10 text-xs text-cyan-200/50 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} RelayOps — Continuous Improvement.
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* Helper Components */
const AuthInput = ({ label, icon, ...props }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-cyan-500 transition-colors">
        {icon}
      </div>
      <input
        {...props}
        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
      />
    </div>
  </div>
);

const AuthButton = ({ children, loading, ...props }) => (
  <button
    {...props}
    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-[0_10px_20px_rgba(6,182,212,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-50 disabled:scale-100"
  >
    {loading ? <Loader2 className="animate-spin" size={20} /> : children}
  </button>
);
