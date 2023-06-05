<template>
  <div class="payment-methods">
    <Tabs :options="{ useUrlFragmet: false }">
      <!-- <tab name="Square up">
        <visa-method />
      </tab> -->
      <tab name="Paypal">
        <paypal-method />
      </tab>
      <tab name="Pago movil">
        <pago-movil />
      </tab>
      <tab name="Trans BoFa">
        <trans-bofa />
      </tab>
      <tab name="Zelle">
        <zelle-method />
      </tab>
      <tab name="Venmo">
        <venmo-method />
      </tab>
    </Tabs>
  </div>
</template>

<script lang="ts" setup>
import { Tabs, Tab } from 'vue3-tabs-component';
</script>

<style scoped>
:deep(.tabs-component) {
  /* @apply border; */
}

:deep(.tabs-component-tabs) {
  @apply flex items-center bg-color-2 rounded-full shadow-xl;
}

:deep(.tabs-component-tab) {
  @apply p-4 px-6 text-color-1 text-xs font-bold lg:(text-base p-4 px-8);
}

:deep(.is-active:not(a)) {
  @apply p-4 px-6 bg-color-6 text-color-7 first:rounded-l-full lg:p-4 lg:px-8;
}

:deep(.is-inactive) {
  @apply p-4 text-white;
}

:deep(.tabs-component-panels) {
  @apply py-6 lg:py-8;
}

.payment-methods {
  @apply w-full;
}
</style>
