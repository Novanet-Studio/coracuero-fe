<template>
  <div>
    <app-slider :slider="home.slider" />
    <app-title
      :text="home.message_a"
      heading="h1"
    />
    <template v-if="isLoading">
      <div class="px-8 lg:px-18">
        <product-loader />
      </div>
    </template>
    <template v-if="!isLoading && categories.length">
      <div v-for="category in categories" :key="category.id">
        <product-landing :category="category" />
      </div>
    </template>
    <app-title
      :text="home.message_b"
      heading="h2"
    />
  </div>
</template>

<script lang="ts" setup>
import home from '~/data/home.json';

const { categories, isLoading } = useCategory({ ordered: true });
</script>
