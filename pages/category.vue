<template>
  <transition name="slide-fade">
    <section class="px-4 mt-6">
      <div>
        <nuxt-link class="flex items-center gap-2 text-md" to="/">
          <PhArrowLeft /> volver
        </nuxt-link>
      </div>
      <header class="mt-6">
        <h2 class="text-2xl font-bold">{{ $route.query.name }}</h2>
      </header>
      {{ JSON.stringify($route.query, null, 2) }}
    </section>
  </transition>
</template>

<script lang="ts" setup>
import { PhArrowLeft } from '@phosphor-icons/vue';

const router = useRouter();
const route = useRoute();

onMounted(() => {
  if (!route.query.name) {
    router.go(-0);
    return;
  }
});
</script>
