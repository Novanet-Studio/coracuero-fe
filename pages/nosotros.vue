<template>
  <section class="nostros">
    <app-slider :slider="nosotros.slider" />

    <app-title heading="h1" text="Bio"></app-title>

    <div class="nosotros__bio">
      <div class="grow-1 w-full">
        <h3 class="text-2xl font-bold mb-5">Español</h3>
        <div class="" v-html="markdown.render(nosotros.bio_es)"></div>
      </div>
      <div
        class="mt-8 border-t border-t-gray-200 pt-8 lg:(border-none pt-0 mt-0) grow-1 w-full"
      >
        <h3 class="text-2xl font-bold mb-5">Inglés</h3>
        <div v-html="markdown.render(nosotros.bio_en)"></div>
      </div>
    </div>
    <div class="mt-5">
      <app-message :message="nosotros.message_a" half-mode />
    </div>
  </section>
</template>

<script lang="ts" setup>
import nosotros from '~/data/nosotros.json';
import MarkdownIt from 'markdown-it';
const markdown = new MarkdownIt();
</script>

<style>
.nosotros__bio {
  @apply px-7 pt-6 md:px-24 w-full lg:(flex gap-4);
}

.nosotros__bio p {
  @apply text-xl leading-8 mb-4;
}

.nosotros__bio div {
  @apply;
}

.nosotros__bio div:nth-child(odd) {
  @apply lg:(border-r-2 pr-4);
}

.nosotros__bio div:nth-child(even) {
  @apply lg:(pl-4);
}
</style>
