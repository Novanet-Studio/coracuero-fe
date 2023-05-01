<template>
  <div class="skeleton">
    <div class="skeleton__header"></div>
    <div class="skeleton__wrapper">
      <div class="skeleton-card" v-for="i in items" :key="i">
        <div class="skeleton-card__title"></div>
        <div class="skeleton-card__image">
          <div class="skeleton-card__btn-wrapper">
            <div class="skeleton-card__btn"></div>
          </div>
        </div>
        <div class="skeleton-card__price"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  items?: number;
};

withDefaults(defineProps<Props>(), {
  items: 2,
});
</script>

<style scoped>
.skeleton {
  @apply animate-pulse my-8 flex flex-col;
}

.skeleton__header {
  @apply w-full h-16 bg-gray-200 rounded-full;
}

.skeleton__wrapper {
  @apply flex gap-8;
}

.skeleton-card {
  @apply w-60 h-72 mt-8 flex flex-col items-center rounded-md;
}

.skeleton-card__title {
  @apply w-32 h-3 bg-gray-300;
}

.skeleton-card__image {
  @apply h-56 w-full mt-3 bg-gray-200 rounded-md relative;
}

.skeleton-card__btn-wrapper {
  @apply flex justify-center;
}

.skeleton-card__btn {
  @apply absolute bg-gray-100 -bottom-3 h-8 w-26 rounded-full;
}

.skeleton-card__price {
  @apply w-10 h-10 rounded-full bg-gray-200 mt-4 self-center;
}
</style>
