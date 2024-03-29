<template>
  <div>
    <h3 class="information-form-title">Información de contacto</h3>
    <form>
      <div class="wrapper">
        <div class="form__group">
          <label class="form__label"
            >Email<sup class="form__required">*</sup></label
          >
          <app-input
            v-model="form.email"
            placeholder="correo@mail.com"
            :is-error="status.email.isError"
            :error-message="status.email.message"
          />
        </div>

        <div class="form__container">
          <div class="form__left">
            <div class="form__group">
              <label class="form__label">Nombre</label>
              <app-input
                v-model="form.name"
                placeholder="Juan"
                :is-error="status.name.isError"
                :error-message="status.name.message"
              />
            </div>
          </div>
          <div class="form__right">
            <div class="form__group">
              <label class="form__label">Apellido</label>
              <app-input
                v-model="form.lastName"
                placeholder="Pérez"
                :is-error="status.lastName.isError"
                :error-message="status.lastName.message"
              />
            </div>
          </div>
        </div>
      </div>

      <h3 class="information-form-title mt-12">Informacion de envio</h3>

      <div class="wrapper">
        <div class="form__group">
          <label class="form__label">Dirección</label>
          <app-input
            v-model="form.address"
            placeholder="Av. Principal con calle Secundaria"
            :is-error="status.address.isError"
            :error-message="status.address.message"
          />
        </div>
        <div class="form__group">
          <label class="form__label">Apartamento</label>
          <app-input
            v-model="form.home"
            placeholder="11E"
            :is-error="status.home.isError"
            :error-message="status.home.message"
          />
        </div>

        <div class="form__group">
          <label class="form__label">Pais</label>
          <app-custom-select
            v-model="form.country"
            label="name"
            value-key="code"
            :options="countries"
            placeholder="Selecciona una opcion"
            :error="status.country.isError"
            :error-message="status.country.message"
          />
        </div>

        <div class="form__grid">
          <div class="form__group-alt">
            <label class="form__label">Ciudad</label>
            <app-input
              v-model="form.city"
              placeholder="Caracas"
              :is-error="status.city.isError"
              :error-message="status.city.message"
            />
          </div>
          <div class="form__group-alt">
            <label class="form__label">Código Postal</label>
            <app-input
              v-model="form.zipCode"
              placeholder="1050"
              :is-error="status.zipCode.isError"
              :error-message="status.zipCode.message"
            />
          </div>
          <div class="form__group">
            <label class="form__label">Numero de contacto</label>
            <app-input
              v-model="form.phone"
              placeholder="04120000102"
              :is-error="status.phone.isError"
              :error-message="status.phone.message"
            />
          </div>
        </div>

        <div class="form__group">
          <app-checkbox
            label="Guardar informacion"
            v-model="checkout.saveInformation"
          />
        </div>
        <div class="form__btn-group ml-0 w-full flex justify-center">
          <app-button
            class="custom-btn"
            btn-type="submit"
            text="Continuar"
            @click="submit"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { useForm } from 'slimeform';
import * as yup from 'yup';
import { yupFieldRule } from 'slimeform/resolvers';
import countries from '~/data/countries.json';

const { $store } = useNuxtApp();
const router = useRouter();
const auth = $store.auth();
const checkout = $store.checkout();

const { form, status, submitter, verify } = useForm({
  form: () => ({
    name: '',
    lastName: '',
    email: '',
    address: '',
    country: '',
    home: '',
    city: '',
    zipCode: '',
    phone: '',
  }),
  rule: {
    name: yupFieldRule(yup.string().required('El campo es obligatorio')),
    lastName: yupFieldRule(yup.string().required('El campo es obligatorio')),
    email: [
      yupFieldRule(yup.string().required('El campo es obligatorio')),
      yupFieldRule(yup.string().email('Formato de email inválido')),
    ],
    address: yupFieldRule(yup.string().required('El campo es obligatorio')),
    country: yupFieldRule(yup.string().required('El campo es obligatorio')),
    home: yupFieldRule(yup.string().required('El campo es obligatorio')),
    city: yupFieldRule(yup.string().required('El campo es obligatorio')),
    zipCode: yupFieldRule(yup.string().required('El campo es obligatorio')),
    phone: yupFieldRule(yup.string().required('El campo es obligatorio')),
  },
  defaultMessage: '',
});

const fillFormFromStorage = () => {
  if (auth.user.email) {
    form.email = auth.user.email;
  }

  if (auth.user.email !== checkout.email) {
    checkout.reset();
    checkout.email = auth.user.email;
    return;
  }

  if (!checkout.email) return;

  form.email = checkout.email || '';
  form.name = checkout.name || '';
  form.lastName = checkout.lastName || '';

  if (!checkout.saveInformation) return;

  form.address = checkout.address || '';
  form.home = checkout.home || '';
  form.country = checkout.country || '';
  form.city = checkout.city || '';
  form.zipCode = checkout.zipCode || '';
  form.phone = checkout.phone || '';
};

const { submit } = submitter(async () => {
  if (!verify()) return;

  const data = { ...form };
  checkout.shippingInfo(data);

  router.push('/shipping');
});

onMounted(() => {
  fillFormFromStorage();
});
</script>

<style scoped>
.information-form-title {
  @apply font-semibold mb-3 text-color-4 text-sm md:text-lg lg:text-xl lg:mb-8;
}

.wrapper {
  @apply bg-color-6 p-10 rounded-xl relative shadow-xl md:p-6 lg:p-8;
}

.form__container {
  @apply flex flex-col justify-between lg:flex-row;
}

.form__left {
  @apply flex-[0_0_100%] gap-4 lg:flex-[0_0_calc(50%-1rem)];
}

.form__right {
  @apply flex-[0_0_100%] md:flex-[0_0_calc(50%-1rem)];
}

.form__label {
  @apply text-xs text-color-1 font-semibold lg:text-sm;
}

.form__group-alt {
  @apply mb-4 md:(px-4 mb-0) lg:mb-6;
}

.form__grid {
  @apply grid grid-cols-1 md:gap-0 lg:(gap-4 grid-cols-2);
}

.custom-btn {
  @apply absolute -bottom-5 rounded-full !w-[40%] !bg-color-1 text-sm !py-2 lg:!w-[20%] lg:text-base lg:!p-3;
}
</style>
