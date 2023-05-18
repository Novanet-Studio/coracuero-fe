<template>
  <nuxt-link :to="`/product/${product.id}`" class="title" :class="class">
    {{ product.name && product.name }}
  </nuxt-link>
</template>

<script lang="ts" setup>
type Props = {
  product: ProductsMapped;
  class?: string;
};

defineProps<Props>();
</script>

<style scoped>
.title {
  @apply m-0 block whitespace-pre-wrap truncate text-color-3 text-center font-semibold text-xs pb-1 pl-0 lg:(text-sm pb-3) overflow-hidden;
}
</style>
