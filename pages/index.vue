<template>
  <div>
    <home-banner />
    <app-message
      message="¿Quieres conocer nuestra colección de cueros? 
Tenemos artículos"
      class="md:(py-6 !text-lg) lg:(py-12 font-bold !text-2xl)"
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
    <app-message message="Productos únicos y verdaderos!" />
  </div>
</template>

<script lang="ts" setup>
const { categories, isLoading } = useCategory({ ordered: true });
</script>
