<template>
  <div>
    <app-slider :slider="home.slider" />
    <app-title :text="home.message_a" heading="h1" />
    <div class="px-8 lg:px-18" v-if="isLoading">
      <product-loader />
    </div>
    <template v-if="!isLoading && categories.length">
      <div class="flex items-center justify-between mt-8 mx-auto max-w-110rem">
        <h3 class="ml-5 text-color-2 font-900 text-2xl">Categorias</h3>
        <transition name="slide-fade">
          <button
            class="block text-xs border border-color-3 px-2 py-1 rounded-xl text-color-3 md:(px-4 py-2 rounded-full) lg:(transition ease hover:(bg-color-3/10))"
            @click="removeFilters"
            v-if="!!categoryActive"
          >
            Remover filtro
          </button>
        </transition>
      </div>
      <div
        class="grid grid-cols-3 place-items-center content-center mt-4 md:(max-w-3xl mx-auto grid-cols-5) lg:(mx-none grid-cols-6) !ml-24"
      >
        <div
          v-for="category in categories"
          :key="category.id"
          :class="!category.subcategories.length && 'hidden'"
        >
          <button
            @click="filterByCategory(category.id)"
            v-if="category.subcategories.length"
          >
            <nuxt-img
              class="w-20 h-20 rounded-full object-cover border md:(w-30 h-30)"
              :class="
                category.id === categoryActive
                  ? 'border-color-1'
                  : 'border-color-5'
              "
              :src="category.subcategories?.[0].products?.[0].images[0].url"
              v-if="category.subcategories?.length"
              placeholder
            />
            <span
              class="text-xs font-bold md:text-sm lg:(text-base block mt-4)"
              >{{ category.name }}</span
            >
          </button>
        </div>
      </div>
      <transition-group name="list" tag="div">
        <product-landing
          v-for="category in categoriesResult.filter(
            (category) => category.subcategories.length
          )"
          :key="category.id"
          :category="category"
          :filtered="!!categoryActive"
        />
      </transition-group>
    </template>
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
