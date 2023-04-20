<template>
  <ul class="rounded-2xl bg-color-8">
    <li
      v-for="link in links"
      :key="link.text"
      :class="
        $route.path.includes(link?.name)
          ? 'bg-color-6 text-white first:rounded-t-2xl'
          : ''
      "
    >
      <nuxt-link
        :to="link.url"
        class="flex mx-8 items-center py-5 text-sm font-semibold lg:text-base"
      >
        <span class="mr-3"
          ><component :is="getIcon(link.name)" v-bind="objectConfig"
        /></span>
        {{ link.text }}
      </nuxt-link>
    </li>
    <li>
      <a
        class="flex mx-8 py-5 text-sm items-center font-semibold lg:text-base"
        href="#"
        @click.prevent="handleLogout"
      >
        <!-- <i class="mr-3 icon-power-switch"></i> -->
        <ph-power weight="light" class="mr-3 lg:text-2xl" />
        Cerrar Sesión
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import {
  PhPower,
  PhMapPin,
  PhReceipt,
  PhBag,
  PhHeart,
} from '@phosphor-icons/vue';
const { $store } = useNuxtApp();
const global = $store.global();
const auth = $store.auth();
const cart = $store.cart();
const router = useRouter();

type Props = {
  breadInfo(path: string): void;
};

defineProps<Props>();

const links = global.getLinks;
const handleLogout = () => {
  auth.authenticated = false;
  cart.clearCart();
  router.push('/');
};

const getIcon = (icon: string) => {
  const icons: { [key: string]: any } = {
    invoices: PhReceipt,
    address: PhMapPin,
    'shopping-cart': PhBag,
    wishlist: PhHeart,
  };

  return icons[icon];
};

const objectConfig = {
  class: 'lg:text-2xl',
};
</script>
