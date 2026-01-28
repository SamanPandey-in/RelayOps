import { FormControl, InputLabel, MenuItem, Select as MuiSelect } from '@mui/material';

/**
 * Select component wrapper around MUI Select
 * @param {string} label - Label for the select
 * @param {Array} options - Array of {value, label} objects
 */
export function Select({ label, options, fullWidth = true, size = 'small', ...props }) {
  return (
    <FormControl fullWidth={fullWidth} size={size}>
      {label && <InputLabel>{label}</InputLabel>}
      <MuiSelect
        {...props}
        label={label}
        sx={{
          borderRadius: '8px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        }}
      >
        {options && options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}
