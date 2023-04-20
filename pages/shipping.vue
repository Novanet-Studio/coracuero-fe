<template>
  <section>
    <header class="my-12">
      <app-message class="!text-2xl" message="Resumen de Informacion" />
    </header>
    <div class="block__content mx-6 lg:mx-16 lg:gap-16">
      <div class="block__left lg:flex-[0_0_55%]">
        <resume-information />
        <div class="block__link-wrapper">
          <nuxt-link class="flex gap-2 items-center" to="/checkout">
            <!-- <i class="icon-arrow-left mr-2"></i> -->
            <ph-arrow-left weight="light" />
            Regresar
          </nuxt-link>
          <nuxt-link to="/payment" class="ps-btn">
            <app-button class="custom-btn" @click="$router.push('/payment')">
              Continuar
            </app-button>
          </nuxt-link>
        </div>
      </div>
      <div class="block__right lg:flex-[0_0_30%]">
        <order-summary :shipping="false" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { PhArrowLeft } from '@phosphor-icons/vue';
definePageMeta({
  middleware: 'authentication',
});
</script>

<style scoped>
.custom-btn {
  @apply rounded-full !bg-color-1 text-sm !py-2 lg:!w-36 lg:!py-3;
}
</style>
