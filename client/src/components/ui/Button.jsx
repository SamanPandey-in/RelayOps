import { Button as MuiButton, CircularProgress } from '@mui/material';

/**
 * Button component wrapper around MUI Button with support for variants
 * @param {string} variant - 'contained', 'outlined', 'text' (default: 'contained')
 * @param {boolean} loading - Shows loading spinner when true
 * @param {string} color - 'primary', 'error', 'warning', 'success', 'info' (default: 'primary')
 * @param {string} size - 'small', 'medium', 'large' (default: 'medium')
 */
export function Button({
  children,
  loading = false,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  disabled,
  type = 'button',
  className,
  startIcon,
  endIcon,
  fullWidth = false,
  ...props
}) {
  return (
    <MuiButton
      {...props}
      variant={variant}
      color={color}
      size={size}
      type={type}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      startIcon={loading ? <CircularProgress size={20} /> : startIcon}
      endIcon={!loading ? endIcon : undefined}
      className={className}
      sx={{
        position: 'relative',
        opacity: loading ? 0.7 : 1,
        pointerEvents: loading ? 'none' : 'auto',
      }}
    >
      {children}
    </MuiButton>
  );
}