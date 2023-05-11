<template>
  <div class="banner">
    <div class="banner__wrapper">
      <div class="banner__left">
        <div class="banner__slider">
          <swiper
            :slides-per-view="1"
            :space-between="1"
            loop
            navigation
            :modules="[Navigation]"
          >
            <swiper-slide v-for="(image, index) in sliderImages" :key="index">
              <img
                class="banner__slider-image"
                :src="image"
                alt="Products of the brand"
              />
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <div class="banner__right">
        <img
          src="~/assets/img/slider/home/promotion-1.jpeg"
          alt="Promotion 1"
          class="h-full rounded-lt-xl"
        />
        <img
          src="~/assets/img/slider/home/promotion-2.jpeg"
          alt="Promotion 2"
          class="h-full rounded-rt-xl"
        />
        <img
          src="~/assets/img/slider/home/promotion-1.jpeg"
          alt="Promotion 1"
          class="h-full rounded-bl-xl"
        />
        <img
          src="~/assets/img/slider/home/promotion-2.jpeg"
          alt="Promotion 2"
          class="h-full rounded-br-xl"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';

const sliderImages = [
  'img/slider/1.jpg',
  'img/slider/2.jpg',
  'img/slider/3.jpg',
];
</script>

<style scoped>
/* Set color for swiper arrows */

:global(.swiper-button-next),
:global(.swiper-button-prev) {
  --swiper-navigation-size: 2rem;
  --swiper-navigation-color: #292929;
}

.banner {
  @apply pt-8 mb-8 px-8;
}

.banner__wrapper {
  @apply flex flex-col flex-nowrap max-w-[1650px] mx-auto md:flex-row;
}

.banner__left {
  @apply w-full min-h-full mb-4 md:(flex-basis-[60%] w-[60%] mb-0);
}

.banner__slider {
  @apply min-h-full relative;
}

.banner__slider-image {
  @apply block w-full h-64 bg-center rounded-xl bg-cover md:(h-72) lg:h-xl;
}

.banner__right {
  @apply grid grid-cols-2 rounded-xl md:(flex-basis-[40%] w-[40%] pl-10);
}

.image-banner {
  @apply h-full object-cover;
}
</style>
