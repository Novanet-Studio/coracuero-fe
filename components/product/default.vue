<template>
  <div class="product">
    <div class="product__thumbnail">
      <product-thumbnail-image
        class="!h-150px !w-150px rounded-xl shadow shadow-sm p-2 lg:(!h-250px !w-250px)"
        :product="product"
      />
      <product-actions :product="product" @quick-view="handleQuickView" />
    </div>
    <div class="product__container">
      <product-title class="truncate !whitespace-pre" :product="product" />
      <div class="product__content">
        <p
          class="flex bg-color-white rounded-full text-color-2 text-sm font-semibold justify-center items-center p-3"
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
  @apply relative flex justify-center p-2;
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
