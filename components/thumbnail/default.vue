<template>
  <client-only>
    <div data-vertical="true">
      <!-- Gallery-->
      <div
        class="flex max-w-xs max-h-xs md:(max-w-sm max-h-sm) lg:(max-w-md max-h-md) h-full"
      >
        <swiper-container
          class="main-swiper"
          :space-between="10"
          :navigation="true"
          :modules="modules"
          thumbs-swiper=".swiper-thumbs"
        >
          <swiper-slide
            class="flex justify-center rounded-2xl"
            v-for="image in product.images"
            :key="image.id"
          >
            <button @click="$emit('show-ligthbox')">
              <nuxt-img
                class="rounded-2xl"
                :src="image.url"
                :alt="image.alternativeText"
                placeholder
              />
            </button>
          </swiper-slide>
        </swiper-container>
      </div>
    </div>
  </client-only>
</template>

<script lang="ts" setup>
import {
  Autoplay,
  Navigation,
  Pagination,
  Thumbs,
  FreeMode,
} from 'swiper/modules';

type Props = {
  product: ProductsMapped;
};

type Emits = {
  (e: 'show-ligthbox'): void;
};

defineProps<Props>();
defineEmits<Emits>();

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
}

swiper-container::part(button-prev),
swiper-container::part(button-next) {
  --swiper-navigation-size: 1rem;
  --swiper-navigation-color: #000;
  @apply bg-dark/90 rounded-full w-4 h-4 p-3 text-white;
}
</style>
