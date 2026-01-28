import React, { useState } from "react";
import { Lock } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Input, Button, Logo } from "../../components";

export default function ResetPassword() {
  const { resetPassword } = useAuth();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6)
      return setError("Password must be at least 6 characters");

    if (password !== confirm)
      return setError("Passwords do not match");

    setLoading(true);
    const result = await resetPassword(token, password);

    if (result.success) {
      navigate("/");
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
          Reset password
        </h1>

        {error && (
          <p className="mt-4 text-sm text-[var(--color-error)]">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <Input
            label="New password"
            type="password"
            icon={<Lock size={18} />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            label="Confirm password"
            type="password"
            icon={<Lock size={18} />}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <Button type="submit" loading={loading} className="w-full">
            Reset password
          </Button>
        </form>
      </div>
    </div>
  );
}
