<template>
  <div class="resume">
    <figure class="resume__content">
      <div class="resume__wrapper">
        <small class="resume__item-title">Contacto:</small>
        <p class="resume__text">
          {{ checkout.email }}
        </p>
      </div>
      <nuxt-link to="/checkout" class="resume__link">Cambiar</nuxt-link>
    </figure>
    <div class="min-w-full h-[0.10rem] my-4 bg-color-3"></div>
    <figure class="resume__content">
      <div class="resume__wrapper">
        <small class="resume__item-title">Enviar a:</small>
        <p class="resume__text">
          {{ checkout.fullAddress }}
        </p>
      </div>
      <nuxt-link to="/checkout" class="resume__link">Cambiar</nuxt-link>
    </figure>
  </div>
</template>

<script lang="ts" setup>
const { $store } = useNuxtApp();
const checkout = $store.checkout();
</script>

<style scoped>
.resume {
  @apply mb-8 px-5 py-3 rounded-xl bg-color-6 rounded-xl text-dark-200 md:p-8;
}

.resume__content {
  @apply mb-0 flex justify-between md:(items-center);
}

.resume__wrapper {
  @apply md:(w-full flex flex-row items-center) lg:gap-2;
}

.resume__item-title {
  @apply flex-basis-[100%] font-bold text-color-1 text-sm max-w-40 md:(flex-0 max-w-18);
}

.resume__text {
  @apply mt-0 mb-0 text-color-3 flex-basis-[100%] text-sm md:flex-1;
}

.resume__link {
  @apply text-sm self-center text-color-1 font-bold max-w-40 text-right;
}
</style>
