<template>
  <span class="loader" :class="class"></span>
</template>

<script lang="ts" setup>
type Props = {
  color?: string;
  class?: string;
};

withDefaults(defineProps<Props>(), {
  color: '#fff',
});
</script>

<style scoped>
.loader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid v-bind(color);
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
