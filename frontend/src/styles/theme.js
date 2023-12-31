export const theme = {
  spacer: "1rem",
  baseColors: {
    grey50: "#f9fafb",
    grey100: "#f3f4f6",
    grey200: "#e5e7eb",
    grey300: "#d1d5db",
    grey400: "#9ca3af",
    grey500: "#6b7280",
    grey600: "#4b5563",
    grey700: "#374151",
    grey800: "#1f2937",
    grey900: "#111827",
  },
  colors: {
    primary: {
      50: "#E28C69",
      100: "#eb5e28",
      700: "#DF4F16",
    },
    secondary: {
      50: "#706F6A",
      100: "#3D3C39",
      700: "#252422",
    },
    danger: {
      50: "##B44D4D",
      100: "#b91c1c",
      700: "#9B0B0B",
    },
    info: {
      50: "#71CEB5",
      100: "#06d6a0",
      500: "#6fa111",
      700: "#0C775A",
    },
    blue: {
      50: "#7C9AEB",
      100: "#264DB8",
      700: "#0C2977",
    },
    pink: {
      50: "#D48BB8",
      100: "#c45f9d",
      700: "#AC4183",
    },

    light: "#ccc5b9",
    lighter: "#fffcf2",
  },

  fonts: {
    Poppins: ["Poppins", "sans-serif"],
    Sono: ["Sono", "sans-serif"],
  },
  backdrop: "#e5e7eb",
  fontSizes: {
    regular: "1.6rem",
    small: ".7rem",
    medium: "1.2rem",
    large: "2em",
  },
  fontWeight: {
    regular: "400",
    semibold: "500",
    bold: "600",
    extrabold: "700",
  },
  lineHeight: {
    regular: "1.5",
    sm: "1",
    md: "1.2",
    lg: "2",
  },
  border: {
    borderSize: {
      tiny: "1px",
      sm: "2px",
    },
    borderRadius: {
      tiny: "3px",
      sm: "5px",
      md: "7px",
      lg: "9px",
    },
  },
  shadow: {
    xs: "0 0.1rem .3rem rgba(0, 0, 0, 0.2)",
    sm: "0 0.3rem .2rem rgba(0, 0, 0, 0.2)",
    md: "0 0.1rem .8rem rgba(0, 0, 0, 0.3)",
    lg: "0 2.4rem 3.2rem rgba(0, 0, 0, 0.3)",
  },
  outline: {
    sm: "#4CAF50 solid 1px",
  },
};

export const statusColors = {
  online: theme.colors.info[500],
  future: theme.colors.pink[100],
  archive: theme.colors.danger[100],
  waiting: theme.colors.secondary[100],
  working: theme.colors.blue[100],
};
