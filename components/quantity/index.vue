<template>
  <div class="quantity" :class="class">
    <button class="quantity__btn" @click.prevent="handleIncreaseQuantity">
      <ph-plus weight="light" />
    </button>
    <input class="quantity__input" v-model="quantity" type="text" disabled />
    <button class="quantity__btn" @click.prevent="handleDescreaseQuantity">
      <ph-minus weight="light" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { PhPlus, PhMinus } from '@phosphor-icons/vue';

type Props = {
  product: ProductsMapped;
  class?: string;
};

const props = defineProps<Props>();
const { $store } = useNuxtApp();
const cart = $store.cart();

const quantity = computed(() => {
  if (!cart.cartItems.length) return null;

  const cartItem = cart.cartItems.find((item) => item.id === props.product.id);

  if (!cartItem) return null;

  return cartItem.quantity;
});

const handleIncreaseQuantity = () => {
  cart.increaseCartItemQuantity(props.product);
};

const handleDescreaseQuantity = () => {
  cart.decreaseCartItemQuantity(props.product);
};
</script>

<style scoped>
.quantity {
  @apply w-20 flex items-center justify-evenly rounded-full bg-color-6 p-2 transition ease-in transition-colors lg:(w-28 p-4);
}

.quantity__btn {
}

.quantity__input {
  @apply h-auto w-6 text-center bg-transparent text-xs;
}
</style>
