<template>
  <div class="relative">
    <button class="cursor-pointer" @click.prevent="toggleIsOpen">
      <div class="header-actions__link">
        <ph-bag class="header-actions__icon" weight="light" />
        <span class="header-actions__indicator-wrapper">
          <i class="header-actions__indicator">{{ total }}</i>
        </span>
      </div>
    </button>
    <!-- Menu -->
    <Transition name="slide-fade">
      <template v-if="isOpen">
        <div v-if="total > 0" class="mini-cart" ref="miniCartRef">
          <div class="mini-cart__body">
            <template v-if="isLoadingCart">
              <loading />
            </template>
            <template v-if="cartProducts?.length">
              <div v-for="(product, index) in cartProducts" :key="index">
                <product-mini-cart :product="product" />
              </div>
            </template>
          </div>
          <div class="mini-cart__footer">
            <h3 class="mini-cart__footer-title">
              Sub total:
              <strong class="mini-cart__amount">${{ amount }}</strong>
            </h3>
            <figure class="mini-cart__wrapper">
              <div class="mini-cart__left">
                <nuxt-link to="/shopping-cart">Ver carrito</nuxt-link>
              </div>
              <div class="mini-cart__right">
                <nuxt-link to="/checkout">Pagar</nuxt-link>
              </div>
            </figure>
          </div>
        </div>
        <div v-else class="mini-cart">
          <div class="mini-cart__empty">No hay productos en el carrito</div>
        </div>
      </template>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { PhBag } from '@phosphor-icons/vue';

const { $store } = useNuxtApp();

const cartStore = $store.cart();
const productStore = $store.product();
const miniCartRef = ref(null);

const total = computed(() => cartStore.total);
const amount = computed(() => cartStore.amount);
const isLoadingCart = computed(() => cartStore.loading);
const cartProducts = computed(() => productStore.cartProducts);

const isOpen = ref(false);

const toggleIsOpen = () => (isOpen.value = !isOpen.value);
</script>

<style scoped>
.mini-cart {
  @apply absolute min-w-[300px] right-0 -left-[220px] z-30 pt-[10px] transition ease shadow shadow-lg rounded-xl lg:pt-0;
}

.mini-cart__body {
  @apply min-h-[150px] relative p-5 max-h-[300px] overflow-auto bg-white border border-white border-b-transparent rounded-md;
}

.mini-cart__footer {
  @apply p-[10px_20px_20px] border-t-0 bg-white rounded-b-md;
}
.mini-cart__footer-title {
  @apply block mb-5 text-base font-semibold flex justify-between text-color-1;
}

.mini-cart__amount {
  @apply text-color-4 font-bold;
}

.mini-cart__empty {
  @apply min-h-[50px] relative p-5 max-h-[300px] overflow-auto text-color-1 bg-white border border-white border-b-transparent;
}

.mini-cart__wrapper {
  @apply flex flex-nowrap justify-between items-center;
}

.mini-cart__left {
  @apply max-w-1/2 pr-1 flex basis-full;
}

.mini-cart__left a {
  @apply btn py-3 text-xs !text-white;
}

.mini-cart__right {
  @apply max-w-1/2 pl-1 basis-full;
}

.mini-cart__right a {
  @apply btn btn--outline py-3 text-xs;
}
</style>
