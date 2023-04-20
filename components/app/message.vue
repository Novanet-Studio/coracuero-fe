<template>
  <div :class="wrapper">
    <p class="message" :class="class">
      {{ message }}
    </p>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  message: string;
  halfMode?: boolean;
  wrapperClass?: string;
  class?: string;
};

const props = withDefaults(defineProps<Props>(), {
  halfMode: false,
});

const wrapper = computed(() => {
  const classes = props.wrapperClass;
  const variant = props.halfMode ? 'message-wrapper-alt' : 'message-wrapper';

  return `${classes} ${variant}`;
});
</script>

<style scoped>
.message-wrapper {
  @apply w-full bg-color-8 p-6;
}

.message {
  @apply text-color-1 text-[10px] text-center whitespace-pre-wrap leading-3 md:(text-xl whitespace-normal);
}

.message-wrapper-alt {
  @apply bg-color-8 p-6 rounded-md shadow w-[90%] mt-12 mx-auto shadow shadow-xl;
}
</style>
