<template>
  <div class="banner">
    <div class="banner__wrapper">
      <div class="banner__left">
        <div class="banner__slider">
          <app-slider :slider="slider" />
        </div>
      </div>
      <div class="banner__right">
        <nuxt-img
          v-for="(image, index) in promotions"
          :src="image.path"
          alt="Promotion 1"
          class="h-full rounded-lt-xl"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  slider?: Array<TemplateStringsArray>;
  promotions?: Array<TemplateStringsArray>;
};

defineProps<Props>();
</script>

<style scoped>
/* Set color for swiper arrows */

:global(.swiper-button-next),
:global(.swiper-button-prev) {
  --swiper-navigation-size: 2rem;
  --swiper-navigation-color: #292929;
}

.banner {
  @apply pt-8 mb-8 px-8;
}

.banner__wrapper {
  @apply flex flex-col flex-nowrap max-w-[1650px] mx-auto md:flex-row;
}

.banner__left {
  @apply w-full min-h-full mb-4 md:(flex-basis-[60%] w-[60%] mb-0);
}

.banner__right {
  @apply ;
}

.image-banner {
  @apply w-full object-cover;
}
</style>
