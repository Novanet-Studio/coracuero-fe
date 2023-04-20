<template>
  <ul class="menu">
    <li
      v-for="item in mainMenu"
      :key="item.text"
      class="first:pl-0"
      :class="$route.path === item?.url ? 'text-color-1 font-bold' : ''"
    >
      <nuxt-link class="menu__item" :to="item.url">
        {{ item.text }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script lang="ts" setup>
const mainMenu = ref([
  {
    text: 'Inicio',
    url: '/',
    extraClass: 'menu-item-has-children',
    subClass: 'sub-menu',
  },
  {
    text: 'Nosotros',
    url: '/nosotros',
    extraClass: 'menu-item-has-children',
    subClass: 'sub-menu',
  },
  {
    text: 'Contáctanos',
    url: '/contacto',
    extraClass: 'menu-item-has-children',
    subClass: 'sub-menu',
  },
]);
</script>

<style scoped>
.menu {
  @apply flex flex-col mb-2 lg:(flex-row gap-3 mb-0);
}

.menu__item {
  @apply block text-xs py-[10px] lg:(text-base py-5);
}
</style>
