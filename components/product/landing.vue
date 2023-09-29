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

      <div
        class="flex gap-2 max-w-full"
        :class="[
          products?.length > 5
            ? 'lg:(max-w-[calc(100%-4rem)])'
            : 'lg:max-w-full',
        ]"
        v-if="products?.length && !filtered"
      >
        <button
          class="prev disabled:opacity-60 hidden lg:block"
          :class="`prev-${category.id}`"
        >
          <ph-caret-left
            class="text-2xl bg-dark/90 rounded-full w-8 h-8 p-1 text-white"
          />
        </button>
        <swiper-container
          :modules="modules"
          class="w-full h-full lg:(w-[calc(100%-4rem)])"
          :space-between="20"
          :slides-per-view="2"
          :pagination="true"
          :navigation="{
            prevEl: `.prev-${category.id}`,
            nextEl: `.next-${category.id}`,
          }"
          :breakpoints="{
            '375': {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            '480': {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            '640': {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            '768': {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            '1024': {
              slidesPerView: 4,
              spaceBetween: 40,
              pagination: false,
            },
          }"
        >
          <swiper-slide
            v-for="product in products"
            :key="product.id"
            class="py-10"
          >
            <product-default :product="product" />
          </swiper-slide>
        </swiper-container>
        <button
          class="disabled:opacity-60 hidden lg:block"
          :class="`next-${category.id}`"
        >
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
  @apply mx-auto px-4 lg:px-18;
}

.landing__header {
  @apply flex flex-nowrap justify-between items-center px-8 py-3 rounded-full bg-color-2 shadow-md shadow-gray-400 lg:(py-5);
}

.landing__title {
  @apply mb-0 inline-block text-md font-semibold text-color-6 md:text-lg lg:text-xl first-letter:uppercase;
}

.landing__content {
  @apply relative pt-6 md:(pt-6 px-8) lg:(pt-14 px-6);
}

swiper-container {
  @apply w-full h-full;
}

swiper-slide {
  @apply text-center text-lg flex justify-center items-center;
}
</style>
