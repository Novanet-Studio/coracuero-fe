<template>
  <swiper-container
    :slides-per-view="1"
    :space-between="1"
    loop="true"
    navigation="true"
    autoplay="true"
    :modules="[Navigation, Autoplay]"
  >
    <swiper-slide v-for="(image, index) in slider" :key="index">
      <img
        class="slider__image"
        :src="image.path"
        alt="Products of the brand"
      />
    </swiper-slide>
  </swiper-container>
</template>

<script lang="ts" setup>
import { Navigation, Autoplay } from 'swiper/modules';

type Props = {
  slider?: Array<TemplateStringsArray>;
};

defineProps<Props>();
</script>

<style scoped>
.slider__image {
  @apply w-full h-62 object-cover md:h-auto;
}

swiper-container::part(button-prev),
swiper-container::part(button-next) {
  --swiper-navigation-size: 1rem;
  --swiper-navigation-color: #000;
  @apply bg-dark/90 rounded-full w-4 h-4 p-3 text-white;
}
</style>
