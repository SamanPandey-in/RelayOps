// theme configuration for MUI (Material-UI) components
import { createTheme } from "@mui/material/styles";

export function getMuiTheme(mode = "light") {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode: isDark ? "dark" : "light",

      primary: {
        main: isDark ? "#ffffff" : "#000000",
        light: isDark ? "#f5f5f5" : "#404040",
        dark: isDark ? "#e5e5e5" : "#000000",
        contrastText: isDark ? "#000000" : "#ffffff",
      },

      secondary: {
        main: isDark ? "#d4d4d4" : "#404040",
        light: isDark ? "#f5f5f5" : "#737373",
        dark: isDark ? "#a3a3a3" : "#171717",
      },

      error: {
        main: isDark ? "#ffffff" : "#000000",
        light: isDark ? "#1f1f1f" : "#f5f5f5",
        dark: isDark ? "#e5e5e5" : "#171717",
      },

      warning: {
        main: isDark ? "#ffffff" : "#000000",
        light: isDark ? "#1f1f1f" : "#f5f5f5",
        dark: isDark ? "#e5e5e5" : "#171717",
      },

      success: {
        main: isDark ? "#ffffff" : "#000000",
        light: isDark ? "#1f1f1f" : "#f5f5f5",
        dark: isDark ? "#e5e5e5" : "#171717",
      },

      info: {
        main: isDark ? "#ffffff" : "#000000",
        light: isDark ? "#1f1f1f" : "#f5f5f5",
        dark: isDark ? "#e5e5e5" : "#171717",
      },

      background: {
        default: isDark ? "#000000" : "#ffffff",
        paper: isDark ? "#0a0a0a" : "#ffffff",
      },

      text: {
        primary: isDark ? "#ffffff" : "#000000",
        secondary: isDark ? "#d4d4d4" : "#404040",
        disabled: isDark ? "#737373" : "#a3a3a3",
      },

      divider: isDark ? "#1f1f1f" : "#e5e5e5",
    },

    typography: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: 16,

      h1: {
        fontSize: "2.25rem",
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: "1.875rem",
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h3: {
        fontSize: "1.5rem",
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
            transition: "all 0.2s ease",
            borderRadius: "8px",
          },

          contained: {
            backgroundColor: isDark ? "#ffffff" : "#000000",
            color: isDark ? "#000000" : "#ffffff",

            "&:hover": {
              backgroundColor: isDark ? "#e5e5e5" : "#171717",
              boxShadow: "none",
            },

            "&:disabled": {
              backgroundColor: isDark ? "#1f1f1f" : "#e5e5e5",
              color: "#a3a3a3",
            },
          },

          outlined: {
            borderColor: isDark ? "#1f1f1f" : "#e5e5e5",
            color: isDark ? "#ffffff" : "#000000",

            "&:hover": {
              backgroundColor: isDark
                ? "rgba(255,255,255,0.06)"
                : "rgba(0,0,0,0.04)",
              borderColor: isDark ? "#ffffff" : "#000000",
            },
          },

          text: {
            color: isDark ? "#ffffff" : "#000000",

            "&:hover": {
              backgroundColor: isDark
                ? "rgba(255,255,255,0.06)"
                : "rgba(0,0,0,0.04)",
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
              backgroundColor: isDark ? "#0a0a0a" : "#ffffff",
              color: isDark ? "#ffffff" : "#000000",
              fontSize: "0.875rem",
              borderRadius: "8px",
              transition: "all 0.2s ease",

              "& fieldset": {
                borderColor: isDark ? "#1f1f1f" : "#e5e5e5",
              },

              "&:hover fieldset": {
                borderColor: isDark ? "#ffffff" : "#000000",
              },

              "&.Mui-focused fieldset": {
                borderColor: isDark ? "#ffffff" : "#000000",
                borderWidth: 2,
              },
            },

            "& .MuiInputBase-input::placeholder": {
              color: isDark ? "#737373" : "#a3a3a3",
              opacity: 1,
            },
          },
        },
      },

      MuiInputAdornment: {
        styleOverrides: {
          root: {
            color: isDark ? "#d4d4d4" : "#404040",
          },
        },
      },

      MuiSelect: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? "#0a0a0a" : "#ffffff",
            color: isDark ? "#ffffff" : "#000000",
            fontSize: "0.875rem",
            borderRadius: "8px",

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: isDark ? "#1f1f1f" : "#e5e5e5",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: isDark ? "#ffffff" : "#000000",
            },
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? "#0a0a0a" : "#ffffff",
            color: isDark ? "#ffffff" : "#000000",
            backgroundImage: "none",
          },
        },
      },

      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: isDark ? "#1f1f1f" : "#d4d4d4",

            "&.Mui-checked": {
              color: isDark ? "#ffffff" : "#000000",
            },
          },
        },
      },
    },
  });
}
