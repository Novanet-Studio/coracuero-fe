<template>
  <client-only>
    <div class="account">
      <div class="account__wrapper">
        <div class="account__main">
          <div class="account__main-wrapper">
            <app-header />
            <section class="account__section">
              <app-message
                wrapper-class="mt-12"
                class="py-10 md:text-xl lg:!text-2xl"
                :message="message"
              />
              <div class="account__section-wrapper">
                <div class="account__section-container">
                  <div class="account__aside">
                    <div>
                      <aside-account :breadcrumb="dynamicBreadcrumb" />
                    </div>
                  </div>
                  <div class="account__content">
                    <nuxt-page />
                  </div>
                </div>
              </div>
            </section>
            <app-footer />
            <!-- <navigation-list /> -->
            <notify />
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script lang="ts" setup>
const { $store } = useNuxtApp();
const route = useRoute();
const global = $store.global();

const message = ref('');

const breadCrumb = ref([
  {
    text: '/Home',
    url: '/',
  },
  {
    text: '',
  },
]);

const accountRoutes = ['/shopping-cart', '/checkout'];

const dynamicBreadcrumb = (path: string): void => {
  if (!accountRoutes.includes(route.path)) {
    breadCrumb.value[1].text = path;
  }
};

provide('title', message);

onMounted(() => {
  // TODO: check why this logic
  if (!accountRoutes.includes(route.path)) {
    // 📝 why this name?
    const routePath = global.getLinks.find((item) => item.url === route.path);
    breadCrumb.value[1].text = routePath?.text || '';
  }
});
</script>

<style scoped>
.account {
  @apply flex relative lg:min-h-screen;
}

.account__wrapper {
  @apply flex-auto backface-hidden flex flex-col min-h-screen max-w-full relative;
}

.account__main {
  @apply lg:(flex);
}

.account__main-wrapper {
  @apply flex-auto max-w-full relative;
}

.account__section {
  @apply pt-4 md:min-h-min;
}

.account__section-wrapper {
}

.account__section-container {
  @apply pt-12 md:(flex mx-4) lg:(min-h-min flex mx-14);
}

.account__aside {
  @apply mx-6 mb-8 md:(mr-0 !flex-basis-[35%]) lg:flex-basis-[30%];
}

.account__content {
  @apply flex-1;
}
</style>
