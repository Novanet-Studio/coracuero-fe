import {
  defineConfig,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  theme: {
    colors: {
      color: {
        1: '#31150C',
        2: '#F6DEB7',
        3: '#C1C1C1',
        4: '#707070',
        5: '#292929',
        6: '#6C513F',
        7: '#F6F5F4',
        8: '#EFE5D4',
      },
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
      'flex justify-center border !bg-transparent border-color-1 text-color-1 hover:(!bg-color-1 border-transparent text-white)',
    'auth-form__wrapper':
      'relative bg-color-8 rounded-xl shadow-xl !pb-1 p-6 mx-auto md:max-w-[26rem] lg:p-10',
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
      'flex justify-between gap-1 text-color-2 md:(justify-end gap-3) lg:gap-4',
    'header-actions__link': 'inline-block relative w-[30px] transition ease',
    'header-actions__link--mx': 'ml-5 md:ml-0',
    'header-actions__icon': 'text-3xl md:text-3xl lg:text-[32px]',
    'header-actions__indicator-wrapper':
      'absolute bottom-0 -right-[5px] flex justify-center items-center w-[20px] h-[20px] text-white bg-dark-300 rounded-full',
    'header-actions__indicator': 'text-xs leading-4 font-medium not-italic',
  },
  presets: [presetUno()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
