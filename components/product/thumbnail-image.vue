<template>
  <nuxt-link
    class="flex h-32 justify-center items-center"
    :class="class"
    :to="`/product/${product.id}`"
  >
    <nuxt-img
      v-if="imageUrl"
      :src="imageUrl"
      :alt="product.name"
      :placeholder="[100, 50, 10]"
      sizes="sm:100vw md:50vw lg:200px"
      fit="outside"
      class="h-full object-contain"
    />
  </nuxt-link>
</template>

<script lang="ts" setup>
type Props = {
  product: ProductsMapped;
  class?: string;
};

const props = defineProps<Props>();
const imageUrl = computed(() => props?.product?.images[0]?.formats?.small?.url);
</script>
