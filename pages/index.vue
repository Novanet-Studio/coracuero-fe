<template>
  <div>
    <app-slider :slider="home.slider" />
    <app-title :text="home.message_a" heading="h1" />
    <div class="px-8" v-if="isLoading">
      <product-loader />
    </div>
    <div id="parent" v-if="!isLoading && categories.length">
      <filter-category
        :category-active="categoryActive"
        :categories="categories"
        @remove-filter="removeFilters"
        @filter="(id) => filterByCategory(id, '#parent')"
      />
      <transition-group name="list" tag="div">
        <product-landing
          v-for="category in categoriesResult.filter(
            (category) => category.subcategories.length
          )"
          :key="category.id"
          :category="category"
          :filtered="!!categoryActive"
          @filter="filterByCategory(category.id, '#parent')"
        />
      </transition-group>
    </div>
    <app-title :text="home.message_b" heading="h2" />
  </div>
</template>

<script lang="ts" setup>
import home from '~/data/home.json';

const {
  isLoading,
  categories,
  categoryActive,
  categoriesResult,
  filterByCategory,
  removeFilters,
} = useCategory({
  ordered: true,
});
</script>
