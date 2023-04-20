<template>
  <section class="invoices">
    <!-- <header class="invoices__header">
      <app-message message="Ordenes de compra" />
    </header> -->
    <div class="invoices__content">
      <invoices-table />
    </div>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'layout-account',
  middleware: 'authentication',
});

const message = inject('title') as Ref<string>;
message.value = 'Ordenes de compra';
</script>

<style scoped>
.invoices {
  @apply w-full lg:w-full;
}

.invoices__header {
  /* @apply mb-[30px] pb-[10px] border-b-2 border-b-light-800 flex w-full; */
}

.invoices__title {
  @apply text-2xl font-semibold text-yellow-400;
}

.invoices__content {
  @apply p-5 px-8;
}
</style>
