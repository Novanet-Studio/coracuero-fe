<template>
  <div class="ps-product__variants max-w-48">
    <swiper
      class="swiper-thumbs"
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
          class="object-fill rounded-2xl h-full w-full"
          :src="image.url"
          :alt="image.alternativeText"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts" setup>
import { Autoplay, Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
  height: 10rem;
  width: 35rem;
  box-sizing: border-box;
  padding: 10px 0;
}

.swiper-thumbs .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}

.swiper-thumbs .swiper-slide-thumb-active {
  /* opacity: 1;
  border: 1px solid #000; */
  @apply opacity-100 border-2 border-color-1;
  /* filter: blur(2px);
  outline-offset: 1px;
  outline: #000 solid; */
}
</style>
