<template>
  <div class="payment-methods">
    <client-only>
      <Tabs :options="{ useUrlFragmet: false }">
        <tab name="Square up">
          <visa-method />
        </tab>
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
    </client-only>
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
  /* @apply flex items-center bg-color-2 rounded-full shadow-xl; */
  @apply grid max-w-26rem md:(w-full max-w-full) rounded-l-2xl rounded-r-2xl shadow shadow-md border-2 grid-cols-3 lg:(grid-cols-6 rounded-l-3xl rounded-r-3xl);
}

:deep(.tabs-component-tab) {
  /* @apply p-4 px-6 text-color-1 text-xs font-bold lg:(text-base p-4 px-8); */
  @apply px-4 py-3 border-b text-xs text-color-1 flex-1 text-center lg:text-sm;
}

:deep(.is-active:not(a)) {
  /* @apply p-4 px-6 bg-color-6 text-color-7 first:rounded-l-full lg:p-4 lg:px-8; */
  @apply px-4 py-3 bg-color-2 text-white font-bold first:(bg-color-2 rounded-tl-2xl) last:(bg-color-2 rounded-br-2xl) [&:nth-child(3)]:(bg-color-2 rounded-tr-2xl) [&:nth-child(4)]:(bg-color-2 rounded-bl-2xl) lg:(first:(rounded-l-3xl) last:(rounded-r-3xl) [&:nth-child(3)]:(rounded-none) [&:nth-child(4)]:(rounded-none));
}

:deep(.is-inactive) {
  @apply text-color-1;
}

:deep(.tabs-component-panels) {
  @apply py-6 lg:py-8;
}

:deep(.is-disabled:not(a)) {
  @apply px-4 py-3 bg-color-2 text-white font-bold;
}
.payment-methods {
  @apply w-full;
}
</style>
