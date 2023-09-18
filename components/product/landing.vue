<template>
  <div class="landing" v-if="category.subcategories.length">
    <div class="landing__wrapper">
      <div class="landing__header">
        <h3 class="landing__title">
          {{ category.name }}
        </h3>
      </div>

      <div class="flex gap-2">
        <button class="prev disabled:opacity-60" :class="`prev-${category.id}`">
          <ph-caret-left
            class="text-2xl bg-dark/90 rounded-full w-8 h-8 p-1 text-white"
          />
        </button>
        <swiper
          :modules="modules"
          :space-between="20"
          :slides-per-view="2"
          :navigation="{
            prevEl: `.prev-${category.id}`,
            nextEl: `.next-${category.id}`,
          }"
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
          class="landing__content flex-1"
        >
          <swiper-slide
            v-for="product in products"
            :key="product.id"
            class="landing__slide"
          >
            <product-default :product="product" />
          </swiper-slide>
        </swiper>
        <button class="disabled:opacity-60" :class="`next-${category.id}`">
          <ph-caret-right
            class="text-2xl bg-dark/90 rounded-full w-8 h-8 p-1 text-white"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue';

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
:global(.swiper-button-next),
:global(.swiper-button-prev) {
  --swiper-navigation-size: 1.5rem;
  --swiper-navigation-color: white;
  height: var(--swiper-navigation-size);
  background: rgba(0, 0, 0, 0.7);
  padding: 1.5em;
  border-radius: 100%;
}

:global(.landing .swiper-button-next),
:global(.landing .swiper-button-prev) {
  --swiper-navigation-size: 1rem;
  padding: 1em;
}

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
