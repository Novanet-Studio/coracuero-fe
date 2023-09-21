<template>
  <div class="widgets">
    <section class="widgets__wrapper flex rounded-full items-center">
      <h3 class="widgets__title px-4 w-36 min-w-20 lg:w-64">Contáctanos</h3>
      <ul class="widgets__list flex gap-2 rounded-full flex-1 py-1">
        <li
          v-for="(item, index) in socialNetworks"
          :key="index"
          class="widgets__item py-2"
        >
          <a class="widgets__link" :href="item.link">
            <component
              :is="item.icon"
              v-bind="{ class: 'text-2xl lg:text-3xl' }"
            />
          </a>
          <span class="hidden md:block">{{ item.text }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts" setup>
import {
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
    link: '#',
    icon: PhWhatsappLogo,
    text: '+58 412-2347585',
  },
  {
    link: '#',
    icon: PhEnvelope,
    text: ' coracuero@gmail.com',
  },
];
</script>

<style scoped>
.widgets {
  @apply pb-7 mx-4 md:px-12;
}

.widgets__wrapper {
  @apply max-w-full w-full relative mb-5 bg-color-2 shadow-sm shadow-cool-gray-400;
}

.widgets__title {
  @apply text-white text-xs text-center font-semibold md:text-sm lg:text-lg;
}

.widgets__list {
  @apply bg-color-5 flex-wrap justify-around;
}

.widgets__item {
  @apply relative text-[10px] py-2 px-1 flex gap-1 items-center first:pl-2 last:pr-2 md:(mr-3 text-sm py-4 first:pl-6) align-top text-color-1 lg:text-base;
}

.widgets__link {
  @apply flex text-lg;
}
</style>
