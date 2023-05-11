<template>
  <section class="edit-address" v-if="type">
    <div class="edit-address__wrapper">
      <div class="edit-address__content">
        <edit-address-form :type="type" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { AddressType } from '~/types';

definePageMeta({
  middleware: 'authentication',
  layout: 'layout-account',
});

const route = useRoute();

const type = computed(() => {
  const type = route.fullPath.split('?')[1];
  const addressType = type.split('=')[1] as AddressType;

  if ([AddressType.Billing, AddressType.Shipping].includes(addressType)) {
    return addressType;
  }

  return type as AddressType.None;
});
</script>

<style scoped>
.edit-address {
  @apply w-full lg:ml-8;
}

.edit-address__wrapper {
  @apply w-full;
}

.edit-address__content {
  @apply p-5;
}
</style>
