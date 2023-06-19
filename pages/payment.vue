<template>
  <section>
    <header class="header">
      <nuxt-link class="header__logo" to="/">
        <img src="/img/logo.png" alt="Project logo" />
      </nuxt-link>
    </header>
    <div class="my-8 mb-0">
      <app-message
        message="Método de pago"
        class="!text-xl lg:!text-2xl"
        wrapper-class="py-14 lg:!p-2 lg:!p-6"
      />
    </div>
    <div class="mt-12 mx-10">
      <div
        class="block__content !flex-col-reverse md:!flex-row lg:mx-16 lg:gap-16"
      >
        <div class="block__left md:flex-[0_0_55%]">
          <resume-information />
          <h4 class="app-title text-base lg:(mt-12 text-xl)">
            Selecciona el método de pago
          </h4>
          <payment-methods />
          <div class="block__link-wrapper">
            <nuxt-link class="" to="/shipping">
              <!-- <i class="icon-arrow-left mr-2"></i> -->
              <ph-arrow-left weight="light" />
              Regresar
            </nuxt-link>
          </div>
        </div>
        <div class="block__right md:flex-[0_0_40%]">
          <order-summary :shipping="false" />
        </div>
      </div>
    </div>
    <app-footer />
  </section>
</template>

<script lang="ts" setup>
import { PhArrowLeft } from '@phosphor-icons/vue';
definePageMeta({
  middleware: 'authentication',
  layout: false,
});
</script>

<style scoped>
.header {
  @apply p-6 flex justify-center mt-12;
}

.header__logo {
  @apply cursor-pointer bg-color-2 p-4 rounded-xl;
}
.app-title {
  @apply font-semibold mb-3 text-color-4 text-sm;
}

.block__link-wrapper a {
  @apply flex items-center gap-2 text-xs mx-4 lg:(text-base mx-0);
}
</style>
