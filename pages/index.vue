<template>
  <div>
    <home-banner />
    <app-message
      message="¿Quieres conocer nuestra colección de cueros? 
Tenemos artículos"
      class="py-12 font-bold !text-2xl"
    />
    <template v-if="isLoading">
      <div class="px-18">
        <product-loader />
      </div>
    </template>
    <template v-if="!isLoading && categories.length">
      <div v-for="category in categories" :key="category.id">
        <product-landing :category="category" />
      </div>
    </template>
    <app-message
      class="py-2 !text-2xl"
      message="Productos únicos y verdaderos!"
    />
  </div>
</template>

<script lang="ts" setup>
const { categories, isLoading } = useCategory({ ordered: true });
</script>
