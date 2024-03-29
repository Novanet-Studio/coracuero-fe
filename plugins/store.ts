import {
  useAuth,
  useCart,
  useCheckout,
  useGlobal,
  useInvoice,
  useProduct,
  useUser,
  useWishList,
} from '../store';

export default defineNuxtPlugin(() => ({
  provide: {
    store: {
      auth: useAuth,
      cart: useCart,
      checkout: useCheckout,
      global: useGlobal,
      invoice: useInvoice,
      product: useProduct,
      user: useUser,
      wishlist: useWishList,
    },
  },
}));
