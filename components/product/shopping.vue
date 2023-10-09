<template>
  <div class="p-shopping">
    <app-button
      class="rounded-full !bg-white border !border-black !w-15 text-xs !p-2 flex items-center justify-center shadow-md lg:text-sm lg:!w-14 lg:!h-14"
    >
      <span class="text-color-1 text-base leading-4 !p-0">$ {{ product?.price }}</span>
    </app-button>
    <figure>
      <div
        class="bg-color-4 !shadow-md rounded-full text-color-2 p-2 w-20 flex justify-between items-center lg:w-28 lg:p-4 lg:px-4"
      >
        <button class="down" @click.prevent="handleDescreaseQuantity">
          <ph-minus class="lg:text-sm" />
        </button>
        <input
          v-model.number="quantity"
          class="bg-color-4 font-bold w-8 text-center"
          type="text"
          disabled
        />
        <button class="up" @click.prevent="handleIncreaseQuantity">
          <ph-plus class="lg:text-sm" />
        </button>
      </div>
    </figure>
    <app-button
      class="rounded-full shadow-md !bg-color-2 !w-36 text-xs lg:text-sm lg:!w-44"
      @click="handleAddToCart"
    >
      Agregar al carrito
    </app-button>
    <app-button
      class="rounded-full !bg-color-6 !w-10 text-xs !p-2 flex items-center justify-center !shadow-md lg:!w-14 lg:!h-14"
      @click="handleAddItemToWishlist"
    >
      <ph-heart class="text-color-1 lg:text-2xl" />
    </app-button>
    <!-- <div class="py-3 mb-4 mt-2 flex justify-center">
      <app-button
        class="absolute -bottom-5 rounded-full !w-[70%] !bg-color-1 text-xs"
        >Comprar</app-button
      >
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { PhPlus, PhMinus, PhHeart } from '@phosphor-icons/vue';

interface Props {
  product: ProductsMapped;
  colorId: string;
}

const { $notify, $store } = useNuxtApp();
const cart = $store.cart();
const productStore = $store.product();
const wishlist = $store.wishlist();
const router = useRouter();
const props = defineProps<Props>();
const quantity = inject('quantity') as Ref<number>;

const handleIncreaseQuantity = () => quantity.value++;
const handleDescreaseQuantity = () =>
  quantity.value > 1 ? quantity.value-- : quantity;

// TODO: add typings
const addItemToCart = async (payload: any) => {
  cart.addProductToCart(payload);

  if (!cart.cartItems.length) return;

  // const itemsId = cart.cartItems.map((item) => item.id);

  // await productStore.getCartProducts(itemsId);

  $notify({
    group: 'all',
    title: '¡Proceso exitoso!',
    text: `${props.product.name} ha sido agregado al carrito!`,
  });
};

// const getCartProduct = async (products: any[]) => {
//   const itemsId = products.map((item) => item.id);
//   await product.getCartProducts(itemsId);
// }

// const loadCartProducts = async () => {
//   if (!cart.cartItems.length) {
//     product.cartProducts = null;
//     return;
//   }

//   const itemsId = cart.cartItems.map((item) => item.id);
//   await product.getCartProducts(itemsId);
// }

const goToCheckout = () => setTimeout(() => router.push('/checkout'), 500);

const handleAddItemToWishlist = () => {
  const item = {
    id: props.product.id,
  };

  wishlist.addItemToWishlist(item);

  $notify({
    group: 'all',
    title: '¡Proceso exitoso!',
    text: `${props.product.name} ha sido agregado a la lista de deseos!`,
  });
};

const handleAddToCart = (isBuyNow = false) => {
  const existItem = cart.cartItems.find((item) => item.id === props.product.id);

  if (!props.colorId) {
    $notify({
      group: 'all',
      title: 'Advertencia!',
      text: `Debe seleccionar un color`,
    });
    return;
  }

  const item = {
    id: props.product.id,
    quantity: quantity.value,
    price: props.product.price,
    color: props.colorId,
  };

  if (!existItem) {
    addItemToCart(item);
    if (isBuyNow) goToCheckout();
    return;
  }

  const isQuantityGreaterThanTen = quantity.value + existItem.quantity > 10;

  if (!isQuantityGreaterThanTen) {
    addItemToCart(item);
    if (isBuyNow) goToCheckout();
    return;
  }

  $notify({
    group: 'all',
    title: 'Advertencia!',
    text: `No puede añadir más de 10 elementos`,
  });
};
</script>

<style scoped>
.p-shopping {
  @apply mt-4 mb-4 flex gap-4 lg:(mb-2 mt-4);
}
</style>
