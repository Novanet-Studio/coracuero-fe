<template>
  <aside class="aside">
    <div class="aside__wrapper">
      <header class="aside__header">
        <h3 class="aside__title">Bienvenido {{ auth.user.username }}</h3>
      </header>
    </div>
    <div>
      <account-links :breadInfo="breadcrumb" />
    </div>
  </aside>
</template>

<script lang="ts" setup>
type Props = {
  breadcrumb(link: string): void;
};

defineProps<Props>();

const { $store } = useNuxtApp();
const auth = $store.auth();
</script>

<style scoped>
.aside {
  @apply flex flex-col;
}

.aside__wrapper {
  @apply flex flex-row flex-nowrap justify-between items-start pb-5;
}

.aside__header {
  @apply flex items-center;
}

.aside__title {
  @apply relative text-color-1 text-2xl mt-0 mb-2 font-bold;
}
</style>
