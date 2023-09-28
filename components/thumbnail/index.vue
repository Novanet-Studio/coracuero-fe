<template>
  <div class="ps-product__variants max-w-full md:(max-w-xs)">
    <swiper-container
      class="swiper-thumbs w-full"
      @swiper="setThumbsSwiper"
      :space-between="10"
      :slides-per-view="4"
      free-mode
      watch-slides-progress
      :modules="modules"
    >
      <swiper-slide
        class="rounded-2xl"
        v-for="image in product.images"
        :key="image.id"
      >
        <img
          class="object-cover rounded-2xl h-20 w-20"
          :src="image.url"
          :alt="image.alternativeText"
        />
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<script lang="ts" setup>
import { Autoplay, Navigation, Pagination, Thumbs } from 'swiper/modules';

type Props = {
  product: ProductsMapped;
};

defineProps<Props>();

const modules = ref([Autoplay, Navigation, Pagination, Thumbs]);

const thumbsSwiper = inject('thumbs') as Ref<any>;

const setThumbsSwiper = (swiper: any) => {
  thumbsSwiper.value = swiper;
};
</script>

<style scoped>
.swiper-thumbs {
  /* height: 20%; */

  box-sizing: border-box;
  padding: 10px 0.2rem;
}

.swiper-thumbs .swiper-slide {
  opacity: 0.4;
}

.swiper-thumbs .swiper-slide-thumb-active {
  @apply opacity-100 border-2 border-color-1;
}
</style>
