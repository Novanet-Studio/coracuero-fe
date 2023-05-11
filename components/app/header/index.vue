<template>
  <header class="header">
    <div class="header__wrapper">
      <div class="header__container">
        <div class="header__brand">
          <nuxt-link class="header__link" to="/">
            <img
              class="w-[69px] mx-auto lg:w-[75px]"
              src="~/assets/img/logo.png"
              alt="Coracuero logo"
            />
          </nuxt-link>
        </div>
        <div class="header__content">
          <app-header-actions />
        </div>
      </div>
    </div>
    <app-navigation />
  </header>
</template>

<style scoped>
.header {
  /* Header classes  */
}

.header__wrapper {
  @apply px-6 py-8 bg-color-5 md:px-10 lg:px-14;
}

.header__container {
  @apply flex items-center justify-between flex-nowrap gap-4 md:(gap-0) lg:(mx-auto);
}

.header__brand {
  @apply flex items-center flex-basis-[35%];
}

.header__link {
  @apply cursor-pointer;
}

.header__content {
  @apply flex flex-col justify-center flex-basis-[30%] sm:max-w-60 md:(max-w-[23.125rem] flex-basis-[auto]);
}
</style>
