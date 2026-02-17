import { TextField, InputAdornment } from '@mui/material';

/**
 * Input component wrapper around MUI TextField
 * @param {React.ReactNode} icon - Icon to display at start of input
 * @param {boolean} error - Shows error state
 * @param {string} helperText - Helper text displayed below input
 * @param {string} type - Input type (default: 'text')
 */
export function Input({
  icon,
  error,
  helperText,
  type = 'text',
  label,
  placeholder,
  fullWidth = true,
  size = 'small',
  ...props
}) {
  return (
    <TextField
      {...props}
      type={type}
      label={label}
      placeholder={placeholder}
      fullWidth={fullWidth}
      size={size}
      error={Boolean(error)}
      helperText={helperText}
      variant='outlined'
      InputProps={{
        startAdornment: icon ? (
          <InputAdornment position='start'>
            {icon}
          </InputAdornment>
        ) : null,
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
        },
      }}
    />
  );
}
