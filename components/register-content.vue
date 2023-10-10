<template>
  <form class="auth-form" @submit.prevent="submit" @keyup.enter="submit">
    <div class="auth-form__wrapper py-8 px-10">
      <h5 class="auth-form__title">Crear una cuenta</h5>
      <div class="flex w-full mb-3">
        <app-input2
          v-model="form.username"
          class="w-full"
          placeholder="Usuario"
          :error="status.username.isError"
          :error-message="status.username.message"
        >
          <template #left>
            <ph-user :size="20" weight="light" class="text-gray-400" />
          </template>
        </app-input2>
      </div>
      <div class="flex w-full mb-4">
        <app-input2
          v-model="form.email"
          class="w-full"
          placeholder="Correo"
          :error="status.email.isError"
          :error-message="status.email.message"
        >
          <template #left>
            <ph-envelope :size="20" weight="light" class="text-gray-400" />
          </template>
        </app-input2>
      </div>

      <div class="flex w-full mb-4">
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
      </div>

      <div class="flex w-full mb-4">
        <app-input2
          v-model="form.confirmPassword"
          class="w-full"
          placeholder="Confirma contraseña"
          :type="showPasswords ? 'text' : 'password'"
          :error="status.confirmPassword.isError"
          :error-message="status.confirmPassword.message"
        >
          <template #left>
            <ph-lock :size="20" weight="light" class="text-gray-400" />
          </template>
        </app-input2>
      </div>

      <app-checkbox label="Mostrar contraseña" v-model="showPasswords" />

      <div class="auth-form__footer">
        <template v-if="state.isLoading">
          <loading />
        </template>
        <app-button
          class="absolute -bottom-5 rounded-full !w-[50%] !bg-color-1 text-sm lg:!w-[50%]"
          text="Registrar cuenta"
          @click="submit"
          v-else
        />
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { PhUser, PhEnvelope, PhLock } from '@phosphor-icons/vue';
import { useForm } from 'slimeform';
import * as yup from 'yup';
import { yupFieldRule } from 'slimeform/resolvers';

/* definePageMeta({
  pageTransition: {
    name: 'page',
  },
});
 */
const router = useRouter();
const { $store, $notify } = useNuxtApp();

const auth = $store.auth();
const product = $store.product();

const state = reactive({
  isLoading: false,
  isDisabled: false,
});

const showPasswords = ref(false);

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#,;\$%\^&\*\.])(?=.{8,})/gm;

const { form, status, submitter, verify } = useForm({
  form: () => ({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  }),
  rule: {
    username: [
      yupFieldRule(
        yup.string().required('El nombre de usuario es obligatorio')
      ),
      yupFieldRule(yup.string().nonNullable()),
      yupFieldRule(yup.string().min(2, 'El nombre de usuario es muy corto')),
      yupFieldRule(yup.string().max(15, 'El nombre de usuario es muy largo')),
    ],
    email: [
      yupFieldRule(yup.string().required('El email es obligatorio')),
      yupFieldRule(yup.string().email('Formato de email inválido')),
    ],
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

const resetState = () => {
  state.isLoading = false;
  state.isDisabled = false;
};

const { submit } = submitter(async () => {
  try {
    state.isLoading = true;
    state.isDisabled = true;

    if (!verify()) {
      $notify({
        group: 'all',
        title: 'Hey!',
        text: 'Debes rellenar el formulario',
      });
      resetState();
      return;
    }

    const response = await auth.createCustomer(form.username, form.email);

    if (!response.value?.data?.id) {
      $notify({
        group: 'all',
        title: 'Error!',
        text: 'Hubo un error al intentar registrarte',
      });
      resetState();
      return;
    }

    const customerId = response.value?.data?.id;

    const { confirmPassword: _, ...body } = form;

    const success = await auth.register({
      customerId,
      ...body,
    });

    if (!success) return;

    setTimeout(() => {
      // if (product.cartProducts?.length) {
      //   router.push('/checkout');
      //   return;
      // }

      router.push('/');
    }, 1000);
  } catch (error: any) {
    console.log(error);
    $notify({
      group: 'all',
      title: 'Oops',
      text: 'Hubo un problema al registrarte',
    });
  } finally {
    resetState();
  }
});
</script>
