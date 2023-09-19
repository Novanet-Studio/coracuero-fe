import {
  defineConfig,
  presetUno,
  presetTypography,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

type MappedColor = Record<number, string> & { [key: string]: string };

const themeColors = {
  color_1: '#000000',
  color_2: '#292929',
  color_3: '#707070',
  color_4: '#C1C1C1',
  color_5: '#E0E0E0',
  color_6: '#F7F6F5',
};

const getColor = (item: string = ''): string | MappedColor => {
  const mapped: MappedColor = {};

  Object.entries(themeColors).forEach(([key, val]) => {
    mapped[key.replace('color_', '')] = val;
  });

  return item ? mapped[item] : mapped;
};

export default defineConfig({
  theme: {
    colors: {
      color: getColor(),
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1366px',
    },
  },
  shortcuts: {
    btn: 'w-full text-center p-[12px] font-semibold bg-color-1 rounded-full text-xs text-white transition ease hover:(bg-color-1 bg-opacity-90) lg:(text-sm p-4)',
    'btn--outline':
      'flex justify-center border !bg-transparent border-black text-color-1 hover:(!bg-color-1 border-transparent text-white)',
    'auth-form__wrapper':
      'relative bg-color-6 rounded-xl shadow-xl !pb-1 p-6 mx-auto md:max-w-[26rem] lg:p-10',
    'auth-form__title': 'text-sm mb-4 text-color-1 font-bold',
    'auth-form__footer': 'py-3 mb-4 mt-2 flex justify-center',
    form__group: 'mx-4 mb-4 md:mb-2 lg:mx-0',
    'form__btn-group': 'mx-4 mb-0 md:(mb-10 w-[25%]) lg:mx-0',
    form__label: 'text-xs mb-6 text-dark-800 lg:text-base',
    form__required: 'ml-1 text-red-500',
    block__content: 'flex flex-col gap-8 lg:flex-row',
    block__left: 'flex-[0_0_100%] md:flex-[0_0_65%]',
    block__right: 'flex-[0_0_100%] md:flex-[0_0_35%]',
    'block__link-wrapper': 'flex justify-between items-center',

    // Header
    'header-actions':
      'flex justify-between gap-1 text-color-6 md:(justify-end gap-3) lg:gap-4',
    'header-actions__link': 'inline-block relative w-[30px] transition ease',
    'header-actions__link--mx': 'ml-5 md:ml-0',
    'header-actions__icon': 'text-3xl md:text-3xl lg:text-[32px]',
    'header-actions__indicator-wrapper':
      'absolute bottom-0 -right-[5px] flex justify-center items-center w-[20px] h-[20px] text-white bg-color-3 rounded-full',
    'header-actions__indicator': 'text-xs leading-4 font-medium not-italic',
  },
  presets: [presetUno(), presetTypography()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  rules: [
    [
      /^border-color-(\d)$/,
      ([, d]) => ({ 'border-color': getColor(d) as string }),
    ],
  ],
});
