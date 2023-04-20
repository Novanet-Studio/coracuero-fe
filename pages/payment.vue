<template>
  <section>
    <header class="my-8 mb-0">
      <app-message
        message="Método de pago"
        class="!text-xl lg:!text-2xl"
        wrapper-class="!p-2 lg:!p-6"
      />
    </header>
    <div class="mt-12 mx-6">
      <div
        class="block__content !flex-col-reverse lg:!flex-row lg:mx-16 lg:gap-16"
      >
        <div class="block__left lg:flex-[0_0_55%]">
          <resume-information />
          <h4 class="app-title text-base lg:text-xl">
            Selecciona el método de pago
          </h4>
          <payment-methods />
          <div class="block__link-wrapper">
            <nuxt-link
              class="bg-color-4 px-6 py-3 rounded-full text-white flex items-center gap-2"
              to="/shipping"
            >
              <!-- <i class="icon-arrow-left mr-2"></i> -->
              <ph-arrow-left weight="light" />
              Regresar
            </nuxt-link>
          </div>
        </div>
        <div class="block__right lg:flex-[0_0_30%]">
          <order-summary :shipping="false" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { PhArrowLeft } from '@phosphor-icons/vue';
definePageMeta({
  layout: false,
});
</script>
