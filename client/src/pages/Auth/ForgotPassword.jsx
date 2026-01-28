import React, { useState } from "react";
import { Mail } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Input, Button, Logo } from "../../components";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const result = await forgotPassword(email);
    if (result.success) {
      setSuccess("Reset link sent. Please check your email.");
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] px-4">
      <div className="w-full max-w-md rounded-2xl bg-[var(--color-surface)] shadow-[var(--box-shadow-card)] p-10">
        <Logo />

        <h1 className="mt-6 text-3xl font-bold text-[var(--color-text)]">
          Forgot password
        </h1>

        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          Enter your email to receive a password reset link.
        </p>

        {error && (
          <p className="mt-4 text-sm text-[var(--color-error)]">{error}</p>
        )}
        {success && (
          <p className="mt-4 text-sm text-[var(--color-success)]">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 ">
          <Input
            label="Email address"
            icon={<Mail size={18} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit" loading={loading} className="w-full">
            Send reset link
          </Button>
        </form>

        <button
          onClick={() => navigate("/")}
          className="mt-6 text-sm text-[var(--color-link)] hover:text-[var(--color-link-hover)]"
        >
          Back to sign in
        </button>
      </div>
    </div>
  );
}
