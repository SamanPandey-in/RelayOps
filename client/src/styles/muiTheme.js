// theme configuration for MUI (Material-UI) components
import { createTheme } from "@mui/material/styles";

export function getMuiTheme(mode = "light") {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode: isDark ? "dark" : "light",

      primary: {
        main: isDark ? "#60a5fa" : "#2563eb",
        light: isDark ? "#93c5fd" : "#3b82f6",
        dark: isDark ? "#3b82f6" : "#1d4ed8",
        contrastText: isDark ? "#000000" : "#ffffff",
      },
      secondary: {
        main: isDark ? "#9ca3af" : "#4b5563",
        light: isDark ? "#d1d5db" : "#9ca3af",
        dark: isDark ? "#6b7280" : "#1f2937",
      },
      error: {
        main: "#dc2626",
        light: "#fecaca",
        dark: "#991b1b",
      },
      warning: {
        main: "#f59e0b",
        light: "#fde68a",
        dark: "#92400e",
      },
      success: {
        main: "#16a34a",
        light: "#bbf7d0",
        dark: "#15803d",
      },
      info: {
        main: "#2563eb",
        light: "#bfdbfe",
        dark: "#1e3a8a",
      },

      background: {
        default: isDark ? "#000000" : "#ffffff",
        paper: isDark ? "#0b0b0b" : "#ffffff",
      },

      text: {
        primary: isDark ? "#ffffff" : "#000000",
        secondary: isDark ? "#9ca3af" : "#4b5563",
        disabled: isDark ? "#6b7280" : "#9ca3af",
      },
      divider: isDark ? "#1f2937" : "#e5e7eb",
    },

    typography: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: 16,
      h1: {
        fontSize: isDark ? "2.25rem" : "2.25rem",
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: isDark ? "1.875rem" : "1.875rem",
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h3: {
        fontSize: isDark ? "1.5rem" : "1.5rem",
        fontWeight: 600,
        lineHeight: 1.4,
      },
      body1: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.5,
      },
      body2: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: 1.5,
      },
      button: {
        fontSize: "0.875rem",
        fontWeight: 500,
        textTransform: "none",
        lineHeight: 1.5,
      },
    },

    shape: {
      borderRadius: 8,
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 500,
            fontSize: "0.875rem",
            transition: "all 0.3s ease",
            borderRadius: "8px",
          },
          contained: {
            backgroundColor: isDark ? "#60a5fa" : "#2563eb",
            color: isDark ? "#000000" : "#ffffff",
            "&:hover": {
              backgroundColor: isDark ? "#3b82f6" : "#1d4ed8",
              boxShadow: "0 4px 12px rgba(37, 99, 235, 0.4)",
            },
            "&:disabled": {
              backgroundColor: isDark ? "#1f2937" : "#d1d5db",
              color: isDark ? "#6b7280" : "#6b7280",
            },
          },
          outlined: {
            borderColor: isDark ? "#374151" : "#d1d5db",
            color: isDark ? "#ffffff" : "#000000",
            "&:hover": {
              backgroundColor: isDark ? "rgba(96, 165, 250, 0.08)" : "rgba(37, 99, 235, 0.08)",
              borderColor: isDark ? "#60a5fa" : "#2563eb",
            },
          },
          text: {
            color: isDark ? "#60a5fa" : "#2563eb",
            "&:hover": {
              backgroundColor: isDark ? "rgba(96, 165, 250, 0.08)" : "rgba(37, 99, 235, 0.08)",
            },
          },
        },
        defaultProps: {
          disableElevation: true,
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              backgroundColor: isDark ? "#111827" : "#ffffff",
              color: isDark ? "#ffffff" : "#000000",
              fontSize: "0.875rem",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              "& fieldset": {
                borderColor: isDark ? "#374151" : "#d1d5db",
              },
              "&:hover fieldset": {
                borderColor: isDark ? "#60a5fa" : "#2563eb",
              },
              "&.Mui-focused fieldset": {
                borderColor: isDark ? "#60a5fa" : "#2563eb",
                borderWidth: 2,
              },
            },
            "& .MuiInputBase-input::placeholder": {
              color: isDark ? "#6b7280" : "#9ca3af",
              opacity: 1,
            },
          },
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            color: isDark ? "#9ca3af" : "#4b5563",
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? "#111827" : "#ffffff",
            color: isDark ? "#ffffff" : "#000000",
            fontSize: "0.875rem",
            borderRadius: "8px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: isDark ? "#374151" : "#d1d5db",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: isDark ? "#60a5fa" : "#2563eb",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? "#0b0b0b" : "#ffffff",
            color: isDark ? "#ffffff" : "#000000",
            backgroundImage: "none",
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: isDark ? "#374151" : "#d1d5db",
            "&.Mui-checked": {
              color: isDark ? "#60a5fa" : "#2563eb",
            },
          },
        },
      },
    },
  });
}
