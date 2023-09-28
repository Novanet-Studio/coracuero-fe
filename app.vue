<template>
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
</template>

<script lang="ts" setup>
import { register } from 'swiper/element/bundle';

const token = useStrapiToken();
const { setToken, setUser } = useStrapiAuth();
const { $store } = useNuxtApp();
const auth = $store.auth();

register();

onMounted(() => {
  if (token.value) return;
  if (!auth.token) return;

  setToken(auth.token);
  setUser({
    ...auth.user,
    id: +auth.user.id,
  });
});
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}

.product-enter-active,
.product-leave-active {
  transition: all 0.4s;
}

.product-enter-from,
.product-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

.slide-fade-leave-active {
  opacity: 0;
  display: none;
  visibility: hidden;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
