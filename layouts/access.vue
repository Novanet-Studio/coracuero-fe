<template>
  <div class="access">
    <div class="access__wrapper">
      <header class="access__header">
        <nuxt-link class="access__link" to="/">
          <img src="~/assets/img/logo.png" alt="Project logo" />
        </nuxt-link>
      </header>
      <nuxt-page />
      <notify />
      <app-footer :show-widgets="false" />
    </div>
  </div>
</template>

<style scoped>
.access {
  @apply w-full min-h-screen overflow-hidden;
}

.access__wrapper {
  @apply w-full mt-12 md:(max-w-xl mx-auto) lg:max-w-full lg:mt-0 lg:(flex flex-col h-screen);
}

.access__header {
  @apply p-6 flex justify-center lg:mt-12;
}

.access__link {
  @apply cursor-pointer bg-color-5 p-4 rounded-xl;
}
</style>
