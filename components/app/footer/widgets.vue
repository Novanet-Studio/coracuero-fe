<template>
  <div class="widgets">
    <section class="widgets__wrapper flex rounded-full items-center">
      <h3 class="widgets__title w-64">Contáctanos</h3>
      <ul class="widgets__list flex gap-2 rounded-full flex-1">
        <li
          v-for="(item, index) in socialNetworks"
          :key="index"
          class="widgets__item py-2"
        >
          <a class="widgets__link" :href="item.link">
            <component :is="item.icon" v-bind="{ class: 'lg:text-3xl' }" />
          </a>
          {{ item.text }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts" setup>
import {
  PhFacebookLogo,
  PhInstagramLogo,
  PhWhatsappLogo,
  PhEnvelope,
} from '@phosphor-icons/vue';

const socialNetworks = [
  {
    link: 'https://www.instagram.com/coracuero/',
    icon: PhInstagramLogo,
    text: '@coracuero',
  },
  {
    link: 'https://www.facebook.com/people/coracuero',
    icon: PhFacebookLogo,
    text: 'coracuero',
  },
  {
    link: '#',
    icon: PhWhatsappLogo,
    text: '+58 412-12345654',
  },
  {
    link: '#',
    icon: PhEnvelope,
    text: 'cora@cuero.com',
  },
];
</script>

<style scoped>
.widgets {
  @apply pb-7 mx-4 md:px-12;
}

.widgets__wrapper {
  @apply max-w-full w-full relative mb-5 bg-color-6 shadow-sm shadow-cool-gray-400;
}

.widgets__title {
  @apply text-white text-[7px] text-center font-semibold md:text-sm lg:text-lg;
}

.widgets__list {
  @apply bg-color-2 flex justify-around;
}

.widgets__item {
  @apply relative text-[7px] py-2 px-1 flex gap-1 items-center first:pl-2 last:pr-2 md:(mr-[20px] text-sm py-4 first:pl-6) align-top text-color-1 lg:text-base;
}

.widgets__link {
  @apply flex text-lg;
}
</style>
