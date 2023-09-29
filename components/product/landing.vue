<template>
  <div class="landing" v-if="category.subcategories.length">
    <div class="landing__wrapper">
      <div class="landing__header">
        <h3 class="landing__title">
          {{ category.name }}
        </h3>
        <!-- <nuxt-link
          class="text-white underline text-sm"
          :to="`/category?name=${category.name.toLowerCase()}`"
        >
          Ver todos
        </nuxt-link> -->
        <button
          class="text-white underline text-sm"
          @click="$emit('filter')"
          v-if="!filtered"
        >
          Ver todos
        </button>
      </div>

      <div class="landing__content" v-if="products?.length && !filtered">
        <button class="landing__button" :class="`prev-${category.id}`">
          <ph-caret-left
            class="text-2xl bg-dark/90 rounded-full w-8 h-8 p-1 text-white"
          />
        </button>
        <swiper-container
          :modules="modules"
      
          :slides-per-view="2"
          :pagination="true"
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
          }"
          class="swiper-container"
        >
          <swiper-slide
            v-for="product in products"
            :key="product.id"
            class="landing__slide"
          >
            <product-default :product="product" />
          </swiper-slide>
        </swiper-container>
        <button class="landing__button" :class="`next-${category.id}`">
          <ph-caret-right
            class="text-2xl bg-dark/90 rounded-full w-8 h-8 p-1 text-white"
          />
        </button>
      </div>

      <div
        class="grid grid-cols-2 gap-4 mt-6 md:(grid-cols-3) lg:(grid-cols-5)"
        v-if="filtered"
      >
        <product-default
          v-for="product in products"
          :product="product"
          :key="product.id"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue';

type Props = {
  category: CategoriesMapped;
  filtered: boolean;
};

type Emits = {
  (e: 'filter'): void;
};

const props = defineProps<Props>();
defineEmits<Emits>();
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

swiper-container::part(bullet-active) {
  --swiper-pagination-color: rgba(0, 0, 0, 0.7);
}

.landing {
  @apply pb-10 first:pt-10;
}

.landing__wrapper {
  @apply mx-auto px-4;
}

.landing__header {
  @apply flex flex-nowrap justify-between items-center px-8 py-3 rounded-full bg-color-2 shadow-md shadow-gray-400 lg:(py-5);
}

.landing__title {
  @apply mb-0 inline-block text-md font-semibold text-color-6 md:text-lg lg:text-xl first-letter:uppercase;
}

.landing__content {
  @apply w-full relative;
}

.landing__button {
  @apply absolute top-[50%] disabled:opacity-60 z-100;
}

.landing__button:first-child {
  @apply left-0
}

.landing__button:last-child {
  @apply right-0 
}


.landing__slide {
  @apply flex w-full justify-center;
}
</style>
