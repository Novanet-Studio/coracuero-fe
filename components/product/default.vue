<template>
  <div class="product">
    <product-title class="truncate !whitespace-pre" :product="product" />
    <div class="product__thumbnail">
      <product-thumbnail-image
        class="!h-[200px] rounded-xl shadow shadow-md p-2"
        :product="product"
      />
      <product-actions :product="product" @quick-view="handleQuickView" />
    </div>
    <div class="product__container">
      <div class="product__content">
        <product-price :product="product" />
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
