<template>
  <div class="landing" v-if="category.subcategories.length">
    <div class="landing__wrapper">
      <div class="landing__header">
        <h3 class="landing__title">
          {{ category.name }}
        </h3>
      </div>
      <div class="landing__content">
        <swiper
          navigation
          :modules="modules"
          :slides-per-view="5"
          :space-between="1"
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
  </div>
</template>

<script lang="ts" setup>
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

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
  @apply pb-20 pt-10;
}

.landing__wrapper {
  @apply mx-auto px-9 lg:px-18;
}

.landing__header {
  @apply flex flex-nowrap justify-between items-center px-8 py-5 rounded-full bg-color-2 shadow-md shadow-gray-400;
}

.landing__title {
  @apply mb-0 inline-block text-sm font-semibold text-color-1 md:text-lg lg:text-xl first-letter:uppercase;
}

.landing__content {
  @apply relative pt-6 lg:pt-14 lg:px-12;
}

.landing__slide {
  @apply flex md:(block !w-[260px]) lg:!w-[297px];
}
</style>
