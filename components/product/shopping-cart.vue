<template>
  <div class="shopping-cart-table">
    <div class="shopping-cart-table__thumbnail">
      <product-thumbnail-image :class="imageClass" :product="product" />
    </div>
    <div class="shopping-cart-table__title">
      <product-title :product="product" />
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  product: ProductsMapped;
  imageClass?: string;
};

defineProps<Props>();
</script>

<style scoped>
.shopping-cart-table {
  @apply flex flex-nowrap flex-row items-center;
}

.shopping-cart-table__thumbnail {
  @apply w-full max-w-[6.25rem] lg:max-w-8;
}

.shopping-cart-table__title {
  @apply text-left w-md pl-8;
}
</style>
