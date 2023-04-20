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
                class="py-10 !text-2xl"
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

// const defaultText = "---";
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
  @apply flex-auto backface-hidden flex flex-col min-h-screen max-w-full relative min-h-full;
}

.account__main {
  @apply flex flex-[1_0_auto] max-w-full transition animate-ease-[cubic-bezier(0.4,0,0.2,1)] h-full min-h-screen;
}

.account__main-wrapper {
  @apply flex-auto max-w-full relative;
}

.account__section {
  @apply pt-4 min-h-screen lg:min-h-min;
}

.account__section-wrapper {
  @apply max-w-sm p-3 mx-auto flex sm:max-w-lg md:max-w-xl lg:(mx-10 max-w-full);
}

.account__section-container {
  @apply pt-12 min-h-screen lg:min-h-min;
}

.account__section-container {
  @apply flex flex-wrap flex-auto -m-3;
}

.account__aside {
  @apply mx-6 mb-8 lg:flex-basis-[20%];
  /* @apply mx-6 flex-[1_1_100%] mb-8 lg:(flex-1 mb-8); */
}

.account__content {
  @apply flex-1;
  /* @apply flex-[0_0_100%] flex-auto; */
}
</style>
