<template>
  <footer class="footer">
    <div class="footer__wrapper">
      <app-footer-widgets v-show="showWidgets" />
      <app-footer-copyright />
    </div>
  </footer>
</template>

<script lang="ts" setup>
interface Props {
  showWidgets: boolean;
}

withDefaults(defineProps<Props>(), {
  showWidgets: true,
});
</script>

<style scoped>
.footer {
  @apply pt-20;
}

.footer__wrapper {
  @apply mx-auto md:(px-0 max-w-full);
}
</style>
