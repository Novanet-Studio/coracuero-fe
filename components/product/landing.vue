<template>
  <div class="landing" v-if="category.subcategories.length">
    <div class="landing__wrapper">
      <div class="landing__header">
        <h3 class="landing__title">
          {{ category.name }}
        </h3>
      </div>

      <swiper
        navigation
        :modules="modules"
        :space-between="20"
        :slides-per-view="3"
        :breakpoints="{
          '375': {
            slidesPerView: 2,
          },
          '480': {
            slidesPerView: 2,
          },
          '640': {
            slidesPerView: 2,
          },
          '768': {
            slidesPerView: 4,
          },
          '1024': {
            slidesPerView: 6,
          },
        }"
        class="landing__content"
      >
        <swiper-slide
          v-for="product in products"
          :key="product.id"
          class="landing__slide"
        >
          <product-default :product="product" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useBreakpoints } from '@vueuse/core';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Props = {
  category: CategoriesMapped;
};

const props = defineProps<Props>();
const products = ref<ProductsMapped[] | null>(null);
const modules = [Autoplay, Navigation, Pagination];

onMounted(() => {
  const productList: ProductsMapped[] = [];

  props.category.subcategories.forEach((sub) =>
    sub.products.forEach((product) => productList.push(product))
  );

  products.value = productList;
});
</script>

<style scoped>
.landing {
  @apply pb-10 first:pt-10;
}

.landing__wrapper {
  @apply mx-auto px-9 lg:px-18;
}

.landing__header {
  @apply flex flex-nowrap justify-between items-center px-8 py-3 rounded-full bg-color-2 shadow-md shadow-gray-400 lg:(py-5);
}

.landing__title {
  @apply mb-0 inline-block text-md font-semibold text-color-6 md:text-lg lg:text-xl first-letter:uppercase;
}

.landing__content {
  @apply relative pt-6 md:(pt-6 px-8) lg:(pt-14 px-12);
}

.landing__slide {
  @apply flex justify-center;
}
</style>
