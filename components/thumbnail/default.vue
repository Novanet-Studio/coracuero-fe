<template>
  <client-only>
    <div class="ps-product__thumbnail h-full" data-vertical="true">
      <figure class="h-full">
        <div class="ps-wrapper container md:max-w-sm lg:max-w-xl h-full">
          <!-- Gallery-->
          <div class="ps-product__gallery h-full">
            <swiper
              class="main-swiper min-h-full"
              :space-between="10"
              :navigation="true"
              :modules="modules"
              :thumbs="{ swiper: thumbsSwiper }"
            >
              <swiper-slide
                class="rounded-2xl"
                v-for="image in product.images"
                :key="image.id"
              >
                <img
                  class="rounded-2xl"
                  :src="image.url"
                  :alt="image.alternativeText"
                />
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </figure>
      <!-- Thumbnail -->
      <!-- <div class="ps-product__variants max-w-48">
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
            class="rounded-lg"
            v-for="image in product.image"
            :key="image.id"
          >
            <img
              class="object-contain rounded-lg"
              :src="image.url"
              :alt="image.alternativeText"
            />
          </swiper-slide>
        </swiper>
      </div> -->
    </div>
  </client-only>
</template>

<script lang="ts" setup>
import { Autoplay, Navigation, Pagination, Thumbs, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

type Props = {
  product: ProductsMapped;
};

defineProps<Props>();

const modules = ref([Autoplay, Navigation, Pagination, Thumbs, FreeMode]);
const thumbsSwiper = inject('thumbs') as Ref<any>;
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper {
  width: 100%;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
}

.main-swiper {
  /* height: 80%; */
  width: 100%;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
