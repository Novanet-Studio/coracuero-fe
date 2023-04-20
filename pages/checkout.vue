<template>
  <section class="checkout">
    <header class="checkout__header">
      <app-message class="!text-2xl" message="Informacion de facturación" />
    </header>
    <div class="checkout__content">
      <div class="checkout__main">
        <checkout-information-form />
      </div>
      <div class="checkout__aside">
        <order-summary />
      </div>
    </div>
  </section>
</template>

<script>
definePageMeta({
  middleware: 'authentication',
});
</script>

<style scoped>
.checkout {
  /* @apply w-full py-[6.25rem] px-3 mx-auto md:max-w-4xl lg:max-w-6xl; */
}

.checkout__header {
  @apply mb-12 mt-8 text-center md:pb-[6.25rem] lg:mb-8 lg:pb-4;
}

.checkout__content {
  @apply flex flex-col-reverse px-8 gap-8 md:flex-row lg:mx-16 lg:gap-16;
}

.checkout__main {
  @apply flex-[0_0_100%] md:flex-[0_0_65%] lg:flex-[0_0_55%];
}

.checkout__aside {
  @apply flex-[0_0_100%] md:flex-[0_0_35%] lg:flex-[0_0_30%];
}
</style>
