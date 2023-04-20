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
  @apply bg-color-2 inline-flex p-3 text-base rounded-full text-color-1 mt-6 shadow-md shadow-gray-200 text-xs font-semibold before:content-$;
}
</style>
