import { Button as MuiButton } from "@mui/material";
import clsx from "clsx";

const variants = {
  primary: `
    bg-[var(--color-btn-bg)]
    text-[var(--color-btn-text)]
    hover:bg-[var(--color-btn-bg-hover)]
  `,
  outline: `
    border border-[var(--color-border)]
    text-[var(--color-text)]
    hover:bg-[var(--color-surface-variant)]
  `,
  ghost: `
    text-[var(--color-text)]
    hover:bg-[var(--color-surface-variant)]
  `,
};

export function Button({
  children,
  loading = false,
  variant = "primary",
  className,
  disabled,
  type = "button",
  ...props
}) {
  return (
    <MuiButton
      {...props}
      type={type}
      disabled={disabled || loading}
      disableRipple
      className={clsx(
        "normal-case font-medium rounded-md transition",
        "px-4 py-2",

        // disabled styles now work
        "disabled:opacity-50 disabled:cursor-not-allowed",

        variants[variant],
        className
      )}
    >
      {loading ? "Please wait..." : children}
    </MuiButton>
  );
}
