<template>
  <div>
    <client-only>
      <div class="default">
        <div class="default__wrapper">
          <div class="default__container">
            <div class="default__content">
              <app-header />
              <div
                class="py-8 bg-color-6 px-16 text-sm text-color-4 font-bold md:(flex justify-center)"
                v-if="$route.path.includes('product')"
              >
                <button @click="$router.go(-1)">Volver</button>
              </div>
              <!-- <navigation-list /> -->
              <main class="default__main">
                <nuxt-page />
              </main>
              <app-footer />
              <notify />
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<style scoped>
.default {
  @apply flex relative;
}
.default__container {
  @apply flex flex-1 max-w-full transition animate-ease-[cubic-bezier(0.4,0,0.2,1)];
}

.default__wrapper {
  @apply flex-auto backface-hidden flex flex-col min-h-screen max-w-full relative;
}
.default__content {
  @apply flex-auto max-w-full relative;
}
.default__main {
  /* @apply lg:px-12 lg:mx-auto; */
}
</style>
