<template>
  <section class="mt-4">
    <ul class="auth__links">
      <li class="auth__link" :class="[isLogin && 'auth__link--active']">
        <nuxt-link to="/auth/login">Iniciar Sesión</nuxt-link>
      </li>
      <li class="auth__link" :class="[!isLogin && 'auth__link--active']">
        <nuxt-link to="/auth/register">Registrarse</nuxt-link>
      </li>
    </ul>
    <div class="auth__content">
      <component :is="isLogin ? LoginContent : RegisterContent" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import LoginContent from '~/components/login-content.vue';
import RegisterContent from '~/components/register-content.vue';

definePageMeta({
  layout: 'access',
  layoutTransition: {
    name: 'page'
  }
});

const isLogin = ref(false);
const route = useRoute();

onMounted(() => {
  if (route.path.includes('login')) {
    isLogin.value = true;
    return;
  }

  isLogin.value = false;
});
</script>

<style scoped>
.auth {
  @apply;
}

.auth__links {
  @apply p-4 flex justify-center;
}

.auth__link {
  @apply text-md font-bold text-color-3 first:mr-8 lg:text-lg;
}

.auth__link--active {
  @apply text-color-4;
}

.auth__link {
  @apply;
}

.auth__content {
  @apply mt-4 mx-10;
}
</style>
