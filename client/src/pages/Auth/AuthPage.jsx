import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';

import { useAuth } from '../../contexts/AuthContext';
import { Logo, Input, Button } from '../../components';

export default function AuthPage() {
  const navigate = useNavigate();
  const { login, signup, signInWithGoogle } = useAuth();

  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const isLoginEmailValid = loginData.email === "" || emailRegex.test(loginData.email);
  const isSignupEmailValid = signupData.email === "" || emailRegex.test(signupData.email);

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] px-4">
      <div className="relative w-full max-w-6xl h-[620px] rounded-2xl overflow-hidden bg-[var(--color-surface)] shadow-[var(--box-shadow-card)]">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[var(--color-primary)] blur-3xl opacity-20" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[var(--color-primary)] blur-3xl opacity-10" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 h-full flex">
          {/* FORMS */}
          <div className="absolute inset-0 flex">
            {/* SIGN IN */}
            <div
              className={`w-1/2 p-12 flex flex-col justify-center transition-all duration-700 ease-in-out
              ${isSignup ? "translate-x-full opacity-0 pointer-events-none" : ""}`}
            >
              <h1 className="text-4xl font-bold text-[var(--color-text)] mb-2">
                Welcome back
              </h1>
              <p className="text-sm text-[var(--color-text-secondary)] mb-8">
                Sign in to continue to your dashboard
              </p>

              {error && !isSignup && (
                <div className="mb-4 rounded-lg border border-[var(--color-error)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-error)]">
                  {error}
                </div>
              )}

              <Button
                type="button"
                variant="outlined"
                color="primary"
                fullWidth
                onClick={async () => {
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
                }}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 10.8v3.6h5.1c-.2 1.3-1.5 3.8-5.1 3.8A6 6 0 1 1 12 6c1.7 0 2.9.7 3.6 1.3l2.4-2.3C16.5 3.6 14.4 2.5 12 2.5A9.5 9.5 0 1 0 21.5 12c0-.6-.1-1.1-.2-1.7H12z"
                  />
                </svg>
                Continue with Google
              </Button>


              <form onSubmit={handleLogin} className="space-y-5 mt-4">
                <Input
                  label="Email address"
                  icon={<Mail size={18} />}
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />

                {!isLoginEmailValid && (
                  <p className="text-xs text-[var(--color-error)] animate-in fade-in">
                    Please enter a valid email address
                  </p>
                )}

                <Input
                  label="Password"
                  type="password"
                  icon={<Lock size={18} />}
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />

                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="text"
                    color="primary"
                    size="small"
                    onClick={() => navigate("/forgot-password")}
                  >
                    Forgot your password?
                  </Button>
                </div>


                <Button
                  type="submit"
                  loading={loading}
                  disabled={!isLoginEmailValid || loginData.password === ""}
                  className="w-full mt-4"
                >
                  Sign in
                </Button>
              </form>
            </div>

            {/* SIGN UP */}
            <div
              className={`w-1/2 p-12 flex flex-col justify-center transition-all duration-700 ease-in-out
              ${isSignup ? "" : "-translate-x-full opacity-0 pointer-events-none"}`}
            >
              <h1 className="text-4xl font-bold text-[var(--color-text)] mb-2">
                Create your account
              </h1>
              <p className="text-sm text-[var(--color-text-secondary)] mb-8">
                Join us and unlock all features
              </p>

              {error && isSignup && (
                <div className="mb-4 rounded-lg border border-[var(--color-error)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-error)]">
                  {error}
                </div>
              )}

              <Button
                type="button"
                variant="outlined"
                color="primary"
                fullWidth
                onClick={async () => {
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
                }}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 10.8v3.6h5.1c-.2 1.3-1.5 3.8-5.1 3.8A6 6 0 1 1 12 6c1.7 0 2.9.7 3.6 1.3l2.4-2.3C16.5 3.6 14.4 2.5 12 2.5A9.5 9.5 0 1 0 21.5 12c0-.6-.1-1.1-.2-1.7H12z"
                  />
                </svg>
                Continue with Google
              </Button>


              <form onSubmit={handleSignup} className="space-y-4 mt-4">
                <Input
                  label="Full name"
                  icon={<User size={18} />}
                  value={signupData.fullName}
                  onChange={(e) =>
                    setSignupData({ ...signupData, fullName: e.target.value })
                  }
                />

                <Input
                  label="Username"
                  icon={<User size={18} />}
                  value={signupData.username}
                  onChange={(e) =>
                    setSignupData({ ...signupData, username: e.target.value })
                  }
                />

                <Input
                  label="Email address"
                  icon={<Mail size={18} />}
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                />

                {!isSignupEmailValid && (
                  <p className="text-xs text-[var(--color-error)] animate-in fade-in">
                    Please enter a valid email address
                  </p>
                )}

                <Input
                  label="Password"
                  type="password"
                  icon={<Lock size={18} />}
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                />

                <Input
                  label="Confirm password"
                  type="password"
                  icon={<Lock size={18} />}
                  value={signupData.confirmPassword}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      confirmPassword: e.target.value,
                    })
                  }
                />

                <Button
                  type="submit"
                  loading={loading}
                  disabled={!isSignupEmailValid || signupData.password === ""}
                  className="w-full mt-4"
                >
                  Create account
                </Button>
              </form>
            </div>
          </div>

          {/* TOGGLE / BRAND PANEL */}
          <div
            className={`absolute top-0 right-0 w-1/2 h-full transition-transform duration-700 ease-in-out
            ${isSignup ? "-translate-x-full" : ""}`}
          >
            <div className="h-full flex flex-col gap-4 justify-center px-12 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] text-white">
              <Logo />

              <h2 className="text-4xl font-bold leading-tight">
                {isSignup ? "Already have an account?" : "New here?"}
              </h2>

              <p className="text-sm max-w-sm text-white">
                {isSignup
                  ? "Sign in to access your personalized dashboard and manage your account."
                  : "Create an account to get full access to all features and tools."}
              </p>

              <Button
                variant="outline"
                className="w-fit self-center border-white text-white hover:bg-white hover:text-[var(--color-primary)] transition-all duration-300"
                onClick={() => setIsSignup(!isSignup)}
              >
                {isSignup ? "Sign in instead" : "Create an account"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
