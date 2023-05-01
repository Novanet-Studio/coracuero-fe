<template>
  <div class="product-mini-cart">
    <div class="product-mini-cart__image-wrapper">
      <product-thumbnail-image class="!h-16" :product="product" />
    </div>
    <div class="product-mini-cart__body">
      <a
        class="product-mini-cart__icon-wrapper"
        href="#"
        @click.prevent="handleRemoveProductFromCart(product)"
      >
        <ph-x weight="light" class="text-color-1" />
      </a>
      <product-title class="truncate !whitespace-pre w-40" :product="product" />
      <small class="text-color-1" v-if="quantity !== null">
        {{ quantity }} x {{ currency }} {{ product.price }}
      </small>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PhX } from '@phosphor-icons/vue';
// import { getProductById as GetProductById } from '~/graphql';

const { $store } = useNuxtApp();

// const graphql = useStrapiGraphQL();

const cartStore = $store.cart();
// const productStore = $store.product();
const global = $store.global();

const props = defineProps<{ product: ProductsMapped }>();

const cartItems = computed(() => cartStore.cartItems);
const currency = computed(() => global.currency);
const quantity = computed(() => {
  if (!cartItems.value.length) return null;

  const item = cartItems.value.find((item) => item.id === props.product.id);

  if (!item) return null;

  return item.quantity;
});

console.log(props.product);

// const loadCartProducts = async () => {
//   try {
//     const temp: ProductsMapped[] = [];
//     if (!cartItems.value.length) productStore.cartProducts = [];
//     if (productStore.cartProducts?.length) return;

//     const itemsList = cartStore.cartItems.map((item) =>
//       graphql<ProductsResponse>(GetProductById, { id: item.id })
//     );

//     const items = await Promise.all(itemsList);

//     if (!items?.length) return;

//     items.forEach((item) => {
//       const product = mapperData<any>(item.data.products.data);
//       temp.push(product);
//     });

//     console.log({ temp });

//     productStore.cartProducts = temp;
//   } catch (err) {
//     console.log(err);
//   } finally {
//     cartStore.loading = false;
//   }
// };

const handleRemoveProductFromCart = (product: any) => {
  const cartItem = cartItems.value.find((item) => item.id === product.id);
  cartStore.removeProductFromCart(cartItem as CartItem);
};
</script>

<style scoped>
.ps-product__remove {
  padding: 1rem;
  border: 1px solid rgb(176, 62, 62);
  border-radius: 4px;
}

.product-mini-cart {
  @apply mb-4 flex flex-nowrap;
}

.product-mini-cart__image-wrapper {
  @apply max-w-12 w-full flex-auto;
}

.product-mini-cart__body {
  @apply relative pr-8 pl-5 flex-1 flex flex-col items-center;
}

.product-mini-cart__icon-wrapper {
  @apply absolute top-0 right-0;
}
</style>
