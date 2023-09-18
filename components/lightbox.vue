<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Navigation, Pagination, Mousewheel, Thumbs } from 'swiper';
import { PhX, PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue';

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'close'): void;
}>();
const props = defineProps<{ modelValue: boolean; images: Image[] }>();

const active = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

const lightboxThumbsSwiper = ref(null);

const setLightboxThumbsSwiper = (swiper: any) =>
  (lightboxThumbsSwiper.value = swiper);

function close() {
  emit('close');
  active.value = false;
}
</script>

<template>
  <Modal v-model="active" :max-width="500">
    <div class="lightbox">
      <a class="lightbox__icon" @click="close">
        <!-- <div class="i-ph-x-light" /> -->
        <PhX />
      </a>
      <div class="md:(flex flex-col gap-4)">
        <figure>
          <div class="ps-wrapper max-w-25rem">
            <!-- Gallery-->
            <div class="ps-product__gallery relative">
              <div class="flex gap-2">
                <button class="prev-lightbox disabled:opacity-60">
                  <PhCaretLeft
                    class="text-2xl bg-dark/90 rounded-full w-8 h-8 p-1 text-white"
                  />
                </button>
                <swiper
                  class="lightbox-swiper"
                  :space-between="10"
                  :navigation="{
                    prevEl: '.prev-lightbox',
                    nextEl: '.next-lightbox',
                  }"
                  autoplay
                  pagination
                  :thumbs="{ swiper: '.lightbox-thumbs' }"
                  :modules="[Navigation, Thumbs, Mousewheel, Pagination]"
                >
                  <swiper-slide v-for="image in images" :key="image.id">
                    <img
                      class="rounded-2xl"
                      :src="image.url"
                      :alt="image.alternativeText"
                    />
                  </swiper-slide>
                </swiper>
                <button class="next-lightbox disabled:opacity-60">
                  <PhCaretRight
                    class="text-2xl bg-dark/90 rounded-full w-8 h-8 p-1 text-white"
                  />
                </button>
              </div>
            </div>
          </div>
        </figure>
        <!-- Thumbnail -->
        <div class="ps-product__variants max-w-32 mt-5 md:(max-w-32 mt-0)">
          <swiper
            class="lightbox-thumbs w-sm"
            @swiper="setLightboxThumbsSwiper"
            :modules="[FreeMode, Navigation]"
            :space-between="4"
            :slides-per-view="6"
            free-mode
            watch-slides-progress
            autoplay
            thumbs
            direction="horizontal"
          >
            <swiper-slide v-for="image in images" :key="image.id">
              <img
                class="object-cover rounded-xl h-80px"
                :src="image.url"
                :alt="image.alternativeText"
              />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </Modal>
</template>

<style scoped>
.lightbox {
  @apply p-4 relative flex justify-center lg:p-6;
}

.lightbox__icon {
  @apply absolute top-3 right-4 cursor-pointer z9;
}

.lightbox-thumbs {
  /* @apply h-100px box-border px-0 py-10px md:(w-300px h-400px) lg:(w-100px w-300px h-400px); */
}

.lightbox-thumbs .swiper-slide-visible {
  @apply opacity-40 !border-2 !border-gray rounded-xl;
  /* width: 25%;
  @apply h-100px; */
}

.lightbox-thumbs .swiper-slide-thumb-active {
  /* opacity: 1; */
  @apply !border-2 !border-color-2 opacity-100 rounded-xl;
}
</style>
