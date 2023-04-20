import { defineConfig, presetUno, transformerDirectives } from 'unocss';

export default defineConfig({
  theme: {
    colors: {
      'color-1': '#31150C',
      'color-2': '#F6DEB7',
      'color-3': '#C1C1C1',
      'color-4': '#707070',
      'color-5': '#292929',
      'color-6': '#6C513F',
      'color-7': '#F6F5F4',
      'color-8': '#EFE5D4',
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1366px',
    },
  },
  presets: [presetUno()],
  transformers: [transformerDirectives()],
});
