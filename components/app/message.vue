<template>
  <div :class="message__wrapper">
    <p class="message__text">
      {{ message }}
    </p>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  message: string;
  halfMode?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  halfMode: false,
});

const message__wrapper = computed(() => {
  const variant = props.halfMode
    ? 'message__wrapper-centered'
    : 'message__wrapper';
  return `${variant}`;
});
</script>

<style scoped>
.message__wrapper {
  @apply w-full bg-color-6 p-6;
}
.message__wrapper-centered {
  @apply mx-auto w-[90%] bg-color-6 mt-12 p-6 rounded-lg shadow shadow-xl;
}
.message__text {
  @apply text-color-3 text-center text-lg leading-8 p-8 
  md:(text-2xl );
}
</style>
