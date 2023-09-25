<template>
  <section class="px-4">
    <div class="auth__content">
      <form class="auth-form">
        <div class="auth-form__wrapper">
          <h5 class="auth-form__title">¿Olvidaste tu contraseña?</h5>
          <p class="text-xs text-balance text-black/50 mb-4">
            Ingrese su correo electrónico y le enviaremos un enlace para
            regresar a su cuenta.
          </p>
          <app-input2
            v-model="form.email"
            placeholder="john@doe.com"
            :error="status.email.isError"
            :error-message="status.email.message"
          >
            <template #left>
              <PhEnvelope weight="light" class="text-gray-400" />
            </template>
          </app-input2>
          <div class="auth-form__footer !mb-0">
            <app-button
              @click="submit"
              :loading="isLoading"
              :disabled="isDisabled"
            >
              Enviar link
            </app-button>
          </div>

          <div class="flex mt-4 justify-center mb-6">
            <nuxt-link class="text-xs underline text-color-2" to="/auth/login"
              >Atrás para iniciar sesión</nuxt-link
            >
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useForm } from 'slimeform';
import { PhEnvelope } from '@phosphor-icons/vue';
import * as yup from 'yup';
import { yupFieldRule } from 'slimeform/resolvers';
import { EMAIL_LS_KEY } from '~/config/constants';

type Form = {
  email: string;
};

definePageMeta({
  layout: 'access',
});

const isLoading = ref(false);
const isDisabled = ref(false);
const { forgotPassword } = useStrapiAuth();
const { $notify } = useNuxtApp();
const router = useRouter();

const { form, status, submitter, verify } = useForm<Form>({
  form: () => ({
    email: '',
  }),
  rule: {
    email: yupFieldRule(
      yup
        .string()
        .email('Formato de correo invalido')
        .required('El campo es requerido')
    ),
  },
  defaultMessage: '',
});
const { submit } = submitter(async ({ form: data }) => {
  if (!verify()) {
    $notify({
      group: 'all',
      title: 'Error!',
      text: 'Por favor, rellene los campos obligatorios',
    });
    return;
  }

  try {
    isLoading.value = true;
    isDisabled.value = true;

    await forgotPassword({
      email: data.email,
    });

    sessionStorage.setItem(EMAIL_LS_KEY, btoa(data.email));

    $notify({
      group: 'all',
      title: 'Link enviado',
      text: 'Te enviamos un correo para restablecer tu contraseña',
    });

    setTimeout(() => {
      router.push('/link-sent');
    }, 1000);
  } catch (error) {
    console.log(error);
    $notify({
      group: 'all',
      title: 'Error',
      text: 'Hubo un problema al intentar enviar el correo',
    });
  } finally {
    isLoading.value = false;
    isDisabled.value = false;
  }
});
</script>

<style scoped>
.auth__links {
  @apply p-4 flex justify-center;
}

.auth__link {
  @apply text-base font-bold text-dark-50 first:mr-8 md:text-2xl;
}

.auth__link--active {
  @apply text-color-3;
}

.auth__content {
  @apply mt-4 container;
}
</style>
