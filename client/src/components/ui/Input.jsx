import { TextField } from "@mui/material";
import clsx from "clsx";

export function Input({
  icon,
  error,
  helperText,
  className,
  ...props
}) {
  return (
    <div className="w-full">
      <TextField
        {...props}
        fullWidth
        error={Boolean(error)}
        helperText={helperText}
        variant="outlined"
        InputProps={{
          startAdornment: icon ? (
            <span className="mr-2 text-[var(--color-text-secondary)]">
              {icon}
            </span>
          ) : null,
          className: clsx(
            "bg-[var(--color-input-bg)] rounded-md",
            "text-sm",
            className
          ),
        }}
        FormHelperTextProps={{
          className: "text-xs text-[var(--color-error)] ml-0",
        }}
        sx={{
          // only structural fixes, no colors
          "& fieldset": {
            borderColor: "var(--color-input-border)",
          },
          "&:hover fieldset": {
            borderColor: "var(--color-primary)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "var(--color-primary)",
          },
        }}
      />
    </div>
  );
}
