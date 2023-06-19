<template>
  <div class="access">
    <div class="access__wrapper">
      <div class="h-full">
        <header class="access__header">
          <nuxt-link class="access__link" to="/">
            <img src="/img/logo.png" alt="Project logo" />
          </nuxt-link>
        </header>
        <main>
          <nuxt-page />
        </main>
      </div>
      <notify />
      <app-footer :show-widgets="false" />
    </div>
  </div>
</template>

<style scoped>
.access {
  @apply flex w-full min-h-screen overflow-hidden;
}

.access__wrapper {
  @apply w-full flex flex-col mt-12 md:(mx-auto) lg:(max-w-full mt-0 flex flex-col h-screen);
}

.access__header {
  @apply p-6 flex justify-center lg:mt-12;
}

.access__link {
  @apply bg-color-1 cursor-pointer p-8 rounded-xl ;
}
</style>
