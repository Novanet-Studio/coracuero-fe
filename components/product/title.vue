<template>
  <nuxt-link :to="`/product/${product.id}`" class="title">
    {{ product.name && product.name }}
  </nuxt-link>
</template>

<script lang="ts" setup>
type Props = {
  product: ProductsMapped;
};

defineProps<Props>();
</script>

<style scoped>
.title {
  @apply m-0 block text-color-5 text-center font-semibold text-xs pb-1 pl-0 lg:(max-h-[calc(1.2em*2)] text-sm pb-3) overflow-hidden;
}
</style>
