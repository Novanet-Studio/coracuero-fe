<template>
  <div class="product">
    <product-title class="truncate !whitespace-pre" :product="product" />
    <div class="product__thumbnail">
      <product-thumbnail-image
        class="!h-150px !w-150px rounded-xl shadow shadow-sm p-2 lg:(!h-250px !w-250px)"
        :product="product"
      />
      <product-actions :product="product" @quick-view="handleQuickView" />
    </div>
    <div class="product__container">
      <div class="product__content">
        <p
          class="flex bg-color-white rounded-full border border-black text-color-2 text-xs w-15 h-15 font-semibold justify-center items-center shadow-md shadow-gray-200 p-3 mt-6"
        >
          $ {{ product.price }}
        </p>
        <!-- <product-price :product="product" /> -->
      </div>
    </div>
    <modal v-model="state.quickView">
      <div class="product-modal">
        <a class="product-modal__icon" @click="state.quickView = false">
          <ph-x weight="light" />
        </a>
        <product-quick-view :product="product" />
      </div>
    </modal>
  </div>
</template>
<script lang="ts" setup>
import { PhX } from '@phosphor-icons/vue';

defineProps<{ product: ProductsMapped }>();

const state = reactive({
  rating: 5,
  modal: false,
  preload: false,
  isImageLoaded: false,
  quickView: false,
});

const handleQuickView = (open: boolean) => (state.quickView = open);
</script>

<style scoped>
.product {
  @apply box-border relative block box-border w-full transition ease lg:(max-w-[250px]);
}

.product__thumbnail {
  @apply relative p-2;
}

.product__content {
  @apply flex justify-center mb-2;
}

.product-modal {
  @apply p-4 relative lg:p-8;
}

.product-modal__icon {
  @apply absolute top-3 right-4 cursor-pointer;
}
</style>
