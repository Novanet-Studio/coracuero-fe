<template>
  <p class="price" :class="class">${{ product.price }}</p>
</template>

<script lang="ts" setup>
type Props = {
  product: ProductsMapped;
  class?: string;
};

defineProps<Props>();
</script>

<style scoped>
.price {
  @apply inline-flex bg-color-white rounded-full border-1 border-black text-color-2 text-base font-semibold shadow-md shadow-gray-200 p-3 mt-6 before:content-$;
}
</style>
