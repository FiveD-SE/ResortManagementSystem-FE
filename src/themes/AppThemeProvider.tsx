import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { TypographyProps } from '@mui/material';
import React from 'react';

type Props = {
  children?: React.ReactNode;
};

declare module '@mui/material/styles' {
  interface TypeGradient {
    [key: string]: string;
  }

  interface Palette {
    gradient: TypeGradient;
  }
  interface PaletteOptions {
    gradient?: TypeGradient;
    dark?: TypeColor;
    black?: TypeColor;
    white?: TypeColor;
    gray?: TypeColor;
    green?: TypeColor;
    red?: TypeColor;
    yellow?: TypeColor;
    blue?: TypeColor;
  }

  interface TypeColor {
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
    [key: string]: string | undefined;
  }

  interface TypographyVariants {
    h1: TypographyProps;
    h2: TypographyProps;
    h3: TypographyProps;
    h4: TypographyProps;
    h5: TypographyProps;
    h6: TypographyProps;

    body1: TypographyProps;
    body2: TypographyProps;
    body3: TypographyProps;

    caption: TypographyProps;

    overline: TypographyProps;
  }

  interface TypographyVariantsOptions {
    h1?: TypographyProps;
    h2?: TypographyProps;
    h3?: TypographyProps;
    h4?: TypographyProps;
    h5?: TypographyProps;
    h6?: TypographyProps;

    body1?: TypographyProps;
    body2?: TypographyProps;
    body3?: TypographyProps;

    caption?: TypographyProps;

    overline?: TypographyProps;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1: true;
    h2: true;
    h3: true;
    h4: true;
    h5: true;
    h6: true;

    body1: true;
    body2: true;
    body3: true;

    caption: true;

    overline: true;
  }
}
export const AppThemeProvider: React.FC<Props> = ({ children }) => {
  const theme = responsiveFontSizes(
    createTheme({
      palette: {
        primary: {
          50: '#FFEBEF',
          100: '#FFC1CC',
          200: '#FFA3B4',
          300: '#FF7A92',
          400: '#FF607D',
          500: '#FF385C',
          600: '#E83354',
          700: '#B52841',
          800: '#8C1F33',
          900: '#6B1827',
        },

        dark: {
          50: '#EBECEE',
          100: '#BFC4CA',
          200: '#A1A8B1',
          300: '#76808D',
          400: '#5B6777',
          500: '#324155',
          600: '#2E3B4D',
          700: '#242E3C',
          800: '#1C242F',
          900: '#151B24',
        },

        black: {
          50: '#E6E6E6',
          100: '#B0B0B0',
          200: '#8A8A8A',
          300: '#545454',
          400: '#333333',
          500: '#000000',
          600: '#000000',
          700: '#000000',
          800: '#000000',
          900: '#000000',
        },

        white: {
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#FFFFFF',
          500: '#FFFFFF',
          600: '#E8E8E8',
          700: '#B5B5B5',
          800: '#8C8C8C',
          900: '#6B6B6B',
        },

        gray: {
          50: '#F0F1F2',
          100: '#D2D3D7',
          200: '#BCBEC4',
          300: '#9DA0A9',
          400: '#8A8D99',
          500: '#6D717F',
          600: '#636774',
          700: '#4D505A',
          800: '#3C3E46',
          900: '#2E2F35',
        },

        green: {
          50: '#ECF8EF',
          100: '#C5E9CD',
          200: '#A9DEB4',
          300: '#81CF92',
          400: '#69C57D',
          500: '#43B75D',
          600: '#3DA755',
          700: '#308242',
          800: '#256533',
          900: '#1C4D27',
        },

        red: {
          50: '#FDECEC',
          100: '#FAC5C3',
          200: '#F7A9A7',
          300: '#F4827E',
          400: '#F16965',
          500: '#EE443F',
          600: '#D93E39',
          700: '#A9302D',
          800: '#832523',
          900: '#641D1A',
        },

        yellow: {
          50: '#FFF7E6',
          100: '#FFE5B0',
          200: '#FFD88A',
          300: '#FFC654',
          400: '#FFBB33',
          500: '#FFAA00',
          600: '#E89B00',
          700: '#B57900',
          800: '#8C5E00',
          900: '#6B4700',
        },

        blue: {
          50: '#E6F4FF',
          100: '#B0DEFF',
          200: '#8ACEFF',
          300: '#54B8FF',
          400: '#33AAFF',
          500: '#0095FF',
          600: '#0088E8',
          700: '#006AB5',
          800: '#00528C',
          900: '#003F6B',
        },

        gradient: {
          1: 'radial-gradient(12158.65% 140.68% at 99.42% 0%, #EB4C60 0%, #EB4C60 48.44%, #EB4C60 100%), radial-gradient(12158.65% 140.68% at 99.42% 0%, #C72D65 0%, #D23760 48.44%, #D23755 100%), radial-gradient(12158.65% 140.68% at 99.42% 0%, #C72D65 0%, #D23760 48.44%, #D23755 100%)',
          2: 'radial-gradient(1413.54% 103.95% at -3.95% 100%, #D33753 0%, #D13660 52.83%, #C72D65 100%)',
          3: 'radial-gradient(12158.65% 140.68% at 99.42% 0%, #C72D65 0%, #D23760 48.44%, #D23755 100%), radial-gradient(12158.65% 140.68% at 99.42% 0%, #C72D65 0%, #D23760 48.44%, #D23755 100%)',
        },
      },

      typography: {
        fontFamily: 'Be Vietnam Pro, sans-serif',

        h1: {
          fontSize: '32px',
          fontWeight: 700,
          lineHeight: 1.25,
          letterSpacing: '-0.02em',
        },
        h2: {
          fontSize: '28px',
          fontWeight: 700,
          lineHeight: 1.3,
          letterSpacing: '-0.02em',
        },
        h3: {
          fontSize: '24px',
          fontWeight: 600,
          lineHeight: 1.35,
          letterSpacing: '-0.01em',
        },
        h4: {
          fontSize: '20px',
          fontWeight: 600,
          lineHeight: 1.4,
          letterSpacing: '0em',
        },
        h5: {
          fontSize: '18px',
          fontWeight: 500,
          lineHeight: 1.5,
          letterSpacing: '0.01em',
        },
        h6: {
          fontSize: '16px',
          fontWeight: 500,
          lineHeight: 1.6,
          letterSpacing: '0.01em',
        },

        body1: {
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: 1.5,
          letterSpacing: '0em',
        },
        body2: {
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: 1.5,
          letterSpacing: '0.01em',
        },
        body3: {
          fontSize: '12px',
          fontWeight: 400,
          lineHeight: 1.6,
          letterSpacing: '0.02em',
        },

        caption: {
          fontSize: '12px',
          fontWeight: 400,
          lineHeight: 1.6,
          letterSpacing: '0.03em',
        },

        overline: {
          fontSize: '10px',
          fontWeight: 700,
          lineHeight: 1.5,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        },
      },

      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              fontFamily: 'Be Vietnam Pro, san serif',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: 1.5,
              color: '#333',
            },
          },
        },
        MuiLink: {
          styleOverrides: {
            root: {
              cursor: 'pointer',
              textDecoration: 'none',
              lineHeight: '16px',
              transition: 'all 0.1s ease-in-out',
              '&:hover': {
                opacity: 0.8,
              },
            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: {
              aspectRatio: '1/1',
            },
          },
        },
      },
    }),
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
