<template>
  <div class="landing" v-if="products?.length">
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
          :slides-per-view="2"
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
const { $store } = useNuxtApp();
const productStore = $store.product();

const products = ref<ProductsMapped[] | null>(null);
const modules = [Autoplay, Navigation, Pagination];

onMounted(async () => {
  const result = await productStore.getProductsByCategory(props.category.id);
  products.value = result;
});
</script>

<style scoped>
.landing {
  @apply pb-20 pt-10;
}

.landing__wrapper {
  @apply max-w-[1650px] mx-auto px-9 lg:px-0;
}

.landing__header {
  @apply flex flex-nowrap justify-between items-center px-5 py-4 rounded-full bg-color-2 shadow-md shadow-gray-400;
}

.landing__title {
  @apply mb-0 inline-block text-sm font-semibold text-color-1 md:text-lg lg:text-xl first-letter:uppercase;
}

.landing__content {
  @apply relative pt-6 lg:pt-14;
}

.landing__slide {
  @apply flex md:(block !w-[260px]) lg:!w-[297px];
}
</style>
