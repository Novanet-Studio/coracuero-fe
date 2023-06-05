<template>
  <div
    class="title__wrapper"
    v-html="`<${heading}> ${text} </${heading}>`"
  ></div>
</template>

<script lang="ts" setup>
type Props = {
  text: string;
  heading: string;
};

defineProps<Props>();
</script>

<style>
h1 {
  @apply text-3xl <sm:(text-2xl);
}

h2 {
  @apply text-2xl <sm:(text-xl);
}

h3 {
}

h4 {
}

h5 {
}

h6 {
}

.title__wrapper {
  @apply text-center font-bold bg-color-6 p-14;
}
</style>
