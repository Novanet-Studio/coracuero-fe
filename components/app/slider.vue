<template>
  <swiper
    :slides-per-view="1"
    :space-between="1"
    loop
    navigation
    :modules="[Navigation]"
  >
    <swiper-slide v-for="(image, index) in slider" :key="index">
      <img
        class="slider__image"
        :src="image.path"
        alt="Products of the brand"
      />
    </swiper-slide>
  </swiper>
</template>

<script lang="ts" setup>
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';

type Props = {
  slider?: Array<TemplateStringsArray>;
};

defineProps<Props>();
</script>

<style scoped>
.slider__image {
  @apply w-full h-62 object-cover md:h-auto;
}
</style>
