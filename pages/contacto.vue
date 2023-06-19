<template>
  <section class="wrapper">
    <app-title heading="h1" text="Contáctanos si tienes cualquier pregunta" />
    <div class="wrapper__content">
      <p class="message">Para pedidos, por favor llene el formulario</p>
      <form class="form" @submit.prevent="submit">
        <div class="form-group">
          <label class="form__label mb-12" for="fullname"
            >Nombre y apellido</label
          >
          <app-input2
            v-model="data.fullname"
            placeholder="john doe"
            :error="status.fullname.isError"
            :error-message="status.fullname.message"
            id="fullname"
          />
        </div>
        <div class="form-group">
          <label class="form__label" for="email">Email</label>
          <app-input2
            v-model="data.email"
            placeholder="john@doe.com"
            :error="status.email.isError"
            :error-message="status.email.message"
            id="email"
          />
        </div>
        <div class="form-group">
          <label class="form__label" for="subject">Asunto</label>
          <app-input2
            v-model="data.subject"
            placeholder="Cueros"
            :error="status.subject.isError"
            :error-message="status.subject.message"
            id="subject"
          />
        </div>
        <div class="form-group">
          <label class="form__label" for="message">Mensaje</label>
          <app-textarea
            v-model="data.message"
            placeholder="Quisiera comprar..."
            :error="status.message.isError"
            :error-message="status.message.message"
            id="message"
          />
        </div>
        <div class="form__footer">
          <app-button class="custom-btn" @click="submit" :disabled="isDisabled">
            <template v-if="isLoading">
              <simple-loader class="!w-8 !h-8" />
            </template>
            <p class="m-1" v-else>Enviar</p>
          </app-button>
        </div>
      </form>
      <p class="message mt-16">Mapa</p>
      <!-- TODO: change to bem when implement real map -->
      <div class="w-full h-80 rounded-xl bg-gray-300 shadow-md" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useForm } from 'slimeform';
import * as yup from 'yup';
import { yupFieldRule } from 'slimeform/resolvers';

const { $notify, $store } = useNuxtApp();

const router = useRouter();
const isDisabled = ref(true);
const isLoading = ref(false);

const {
  form: data,
  status,
  submitter,
  verify,
} = useForm({
  form: () => ({
    fullname: '',
    email: '',
    subject: '',
    message: '',
  }),
  rule: {
    fullname: yupFieldRule(
      yup.string().required('Por favor ingrese su usuario')
    ),
    email: yupFieldRule(
      yup
        .string()
        .email('Formato de email inválido')
        .required('Por favor ingrese su contraseña')
    ),
    subject: yupFieldRule(yup.string().required('Por favor ingrese su asunto')),
    message: yupFieldRule(
      yup.string().required('Por favor ingrese su mensaje')
    ),
  },
  defaultMessage: '',
});

const { submit } = submitter(async () => {
  try {
    if (!verify()) {
      $notify({
        group: 'all',
        title: 'Error!',
        text: 'Por favor, rellene los campos obligatorios',
      });
      return;
    }

    setTimeout(() => {
      router.push('/');
    }, 1000);
  } catch (error: any) {
    console.log(error.toString());
    $notify({
      group: 'all',
      title: 'Error!',
      text: 'Hubo un problema al iniciar sesión',
    });
  } finally {
    isDisabled.value = true;
  }
});
</script>

<style scoped>
.wrapper {
  @apply 
}

.wrapper__content {
  @apply mx-10 mt-10 lg:(max-w-6xl mx-auto);
}

.message {
  @apply text-xs text-color-4 font-semibold mb-4 md:text-lg lg:text-xl;
}

.form {
  @apply relative bg-color-6 rounded-xl shadow-md !pb-1 p-6 mx-auto md:p-12;
}

.form-group {
  @apply flex flex-col mb-4;
}

.form__label {
  @apply text-xs text-color-1 font-semibold md:(mb-2 text-sm);
}

.form__footer {
  @apply py-3 mb-4 mt-2 flex justify-center;
}

.custom-btn {
  @apply absolute -bottom-5 rounded-full !w-[20%] !bg-color-1 text-sm !py-2;
}
</style>
