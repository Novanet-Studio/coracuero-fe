<template>
  <div v-if="!auth.authenticated" class="user-area">
    <div class="user-area__icon-wrapper">
      <nuxt-link to="/auth/login">
        <!-- <i class="user-area__icon icon-user"></i> -->
        <ph-user class="header-actions__icon" weight="light" />
      </nuxt-link>
    </div>

    <div class="user-area__links-group">
      <nuxt-link to="/auth/login" class="user-area__link">Ingresar</nuxt-link>
      <nuxt-link to="/auth/register" class="user-area__link"
        >Registro</nuxt-link
      >
    </div>
  </div>
  <div
    v-else
    class="user-area__menu"
    @click="isOpen = !isOpen"
    @mouseover="isOpen = true"
    @mouseleave="isOpen = false"
  >
    <ph-user class="header-actions__icon" weight="light" />
    <Transition name="slide-fade">
      <div class="user-area__menu-container" v-if="isOpen">
        <ul class="user-area__menu-list">
          <li
            v-for="link in global?.getLinks"
            :key="link.text"
            class="user-area__menu-list-item"
          >
            <nuxt-link :to="link.url" class="user-area__menu-link">
              {{ link.text }}
            </nuxt-link>
          </li>
          <li class="user-area__menu-logout user-area__menu-list-item">
            <a href="#" @click.prevent="handleLogout"> Cerrar Sesión </a>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { PhUser } from '@phosphor-icons/vue';
const { $store } = useNuxtApp();
const auth = $store.auth();
const cart = $store.cart();
const product = $store.product();
const global = $store.global();
const router = useRouter();

const isOpen = ref(false);

const handleLogout = () => {
  auth.reset();
  cart.clearCart();
  cart.clearCartItems();
  product.clearProducts();
  router.go(0);
};
</script>

<style scoped>
.user-area {
  @apply mr-5 flex flex-nowrap text-left cursor-pointer;
}

.user-area__icon-wrapper {
  /* @apply flex flex-nowrap items-center; */
}

.user-area__links-group {
  @apply pl-[10px];
}

.user-area__link {
  @apply block font-bold text-xs lg:text-sm;
}

.user-area__menu {
  @apply mr-5 relative cursor-pointer w-5;
}

.user-area__menu-container {
  @apply absolute min-w-[240px] -right-3 z-30 mt-1 opacity-100 bg-white px-4 py-2 rounded-sm transition ease opacity-100;
}

.user-area__icon {
  @apply text-2xl;
}

.user-area__menu-list {
  @apply p-3;
}

.user-area__menu-list-item {
  @apply mb-5 transition hover:text-color-1 hover:font-bold;
}

.user-area__menu-link {
  @apply pl-0 text-dark-500 transition ease;
}

.user-area__menu-logout {
  @apply pt-[10px] mb-0 border-t border-t-color-6 text-dark-500;
}
</style>
