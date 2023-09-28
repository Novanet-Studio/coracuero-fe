<template>
  <div class="thumbnail-quick-view">
    <figure class="thumbnail-quick-view__figure">
      <div class="thumbnail-quick-view__content">
        <swiper-container
          :centered-slides="true"
          navigation
          :modules="[Navigation]"
        >
          <swiper-slide
            v-for="(image, index) in product.images"
            :key="index"
            class="thumbnail-quick-view__slide !flex"
          >
            <img :src="image.formats.thumbnail.url" />
          </swiper-slide>
        </swiper-container>
      </div>
    </figure>
  </div>
</template>

<script lang="ts" setup>
import { Navigation } from 'swiper/modules';

defineProps<{ product: ProductsMapped }>();
</script>

<style scoped>
:global(.swiper-button-next),
:global(.swiper-button-prev) {
  --swiper-navigation-size: 2rem;
}

.thumbnail-quick-view {
  @apply max-w-full w-full flex flex-row-reverse flex-nowrap justify-center items-center mb-12 mt-12 lg:max-w-[43%];
}

.thumbnail-quick-view__figure {
  @apply relative block flex-basis-[100%] max-w-full m-0 lg:max-w-[calc(100%-60px)];
}

.thumbnail-quick-view__content {
  @apply relative lg:pl-1;
}

.thumbnail-quick-view__slide {
  @apply flex justify-center;
}
</style>
