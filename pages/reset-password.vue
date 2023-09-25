<template>
  <section class="container mt-12 px-4">
    <form class="auth-form">
      <div class="auth-form__wrapper">
        <h5 class="auth-form__title font-bold">Reestablece tu contraseña</h5>
        <p class="text-xs text-balance text-black/50 mb-4">
          Reestablezca su contraseña para poder ingresar a su cuenta nuevamente.
        </p>
        <app-input2
          v-model="form.password"
          class="w-full"
          placeholder="Ingresa tu contraseña"
          :type="showPasswords ? 'text' : 'password'"
          :error="status.password.isError"
          :error-message="status.password.message"
        >
          <template #left>
            <ph-lock :size="20" weight="light" class="text-gray-400" />
          </template>
        </app-input2>
        <app-input2
          v-model="form.confirmPassword"
          class="w-full mt-2"
          placeholder="Confirma contraseña"
          :type="showPasswords ? 'text' : 'password'"
          :error="status.confirmPassword.isError"
          :error-message="status.confirmPassword.message"
        >
          <template #left>
            <ph-lock :size="20" weight="light" class="text-gray-400" />
          </template>
        </app-input2>
        <app-checkbox
          class="mt-2"
          label="Mostrar contraseñas"
          v-model="showPasswords"
        />
        <div class="auth-form__footer !mb-0">
          <app-button
            @click="submit"
            :loading="isLoading"
            :disabled="isDisabled"
          >
            Enviar
          </app-button>
        </div>
      </div>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { PhLock } from '@phosphor-icons/vue';
import { useForm } from 'slimeform';
import * as yup from 'yup';
import { yupFieldRule } from 'slimeform/resolvers';
import { PASSWORD_REGEX, EMAIL_LS_KEY } from '~/config/constants';

type Form = {
  password: string;
  confirmPassword: string;
};

definePageMeta({
  layout: 'access',
});

const REDIRECT_DELAY = 500;

const route = useRoute();
const router = useRouter();
const isLoading = ref(false);
const isDisabled = ref(false);
const { resetPassword } = useStrapiAuth();
const { $notify } = useNuxtApp();
const showPasswords = ref(false);

const { form, status, submitter, verify } = useForm<Form>({
  form: () => ({
    password: '',
    confirmPassword: '',
  }),
  rule: {
    password: [
      yupFieldRule(yup.string().required('La contraseña es obligatoria')),
      yupFieldRule(
        yup
          .string()
          .matches(
            PASSWORD_REGEX,
            'Debe ser igual o mayor a 8 carácteres, una letra mayúscula, una minúscula, un número y un carácter especial'
          )
      ),
    ],
    confirmPassword: [
      yupFieldRule(yup.string().required('Debes confirmar contraseña')),
      yupFieldRule(
        yup
          .string()
          .test('match-passwords', 'Contraseñas no coinciden', (value) => {
            return form.password === value;
          })
      ),
    ],
  },
  defaultMessage: '',
});

const { submit } = submitter(async ({ form: data }) => {
  try {
    isLoading.value = true;
    isDisabled.value = true;

    await resetPassword({
      code: route.query.code as string,
      password: data.password,
      passwordConfirmation: data.confirmPassword,
    });

    $notify({
      group: 'all',
      title: 'Se reestableció su contraseña',
      text: 'Por favor, inicie sesión',
    });

    // remove email saved in session storage
    sessionStorage.removeItem(EMAIL_LS_KEY);

    setTimeout(() => {
      router.push('/auth/login');
    }, REDIRECT_DELAY);
  } catch (error) {
    $notify({
      group: 'all',
      title: 'Error!',
      text: 'Hubo un problema al reestablecer su contraseña',
    });
  } finally {
    isLoading.value = false;
    isDisabled.value = false;
  }
});

onMounted(() => {
  if (!route.query.code) {
    return router.push('/auth/login');
  }
});
</script>
