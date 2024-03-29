<template>
  <form class="address-form">
    <header class="address-form__header">
      <h3 class="address-form__title">
        {{ title }}
      </h3>
    </header>
    <div class="bg-color-6 rounded-2xl lg:p-12 lg:px-20 relative">
      <div class="address-form__group">
        <label class="address-form__label"
          >País<sup class="address-form__required">*</sup></label
        >
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
      <div class="address-form__group">
        <label class="address-form__label" for="streetAddress"
          >Dirección<sup class="address-form__required">*</sup>
        </label>
        <app-input
          v-model="form.streetAddress"
          placeholder="Av Fco Miranda, calle solar"
          :is-error="status.streetAddress.isError"
          :error-message="status.streetAddress.message"
        />
      </div>
      <div class="address-form__group">
        <label class="address-form__label" for="state"
          >Estado<sup class="address-form__required">*</sup>
        </label>
        <app-input
          v-model="form.state"
          placeholder="Miranda"
          :is-error="status.state.isError"
          :error-message="status.state.message"
        />
      </div>
      <div class="address-form__group">
        <label class="address-form__label"
          >Código postal<sup class="address-form__required">*</sup>
        </label>
        <app-input
          v-model="form.postcode"
          placeholder="1073"
          :is-error="status.postcode.isError"
          :error-message="status.postcode.message"
        />
      </div>
      <div class="address-form__group-btn">
        <app-button
          class="absolute -bottom-5 !w-[20%]"
          btn-type="submit"
          text="Guardar"
          @click="submit"
        />
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useForm } from 'slimeform';
import * as yup from 'yup';
import { yupFieldRule } from 'slimeform/resolvers';
import { AddressType } from '~/types';
import countries from '~/data/countries.json';

const props = defineProps<{ type: AddressType }>();

const { $store } = useNuxtApp();

const auth = $store.auth();
const checkout = $store.checkout();

const haveLastAddress = ref(false);
const existentId = ref('');

const type = computed<AddressType>(() =>
  [AddressType.Billing, AddressType.Shipping].includes(props.type)
    ? props.type
    : AddressType.None
);

const title = computed(() =>
  type.value === AddressType.Billing
    ? 'Dirección de facturación'
    : 'Dirección de envío'
);

const { form, status, submitter, verify } = useForm({
  form: () => ({
    country: 'VE',
    streetAddress: '',
    state: '',
    postcode: '',
  }),
  rule: {
    country: yupFieldRule(yup.string().required('El campo es obligatorio')),
    streetAddress: yupFieldRule(
      yup.string().required('El campo es obligatorio')
    ),
    state: yupFieldRule(yup.string().required('El campo es obligatorio')),
    postcode: yupFieldRule(yup.string().required('El campo es obligatorio')),
  },
});

const { submit } = submitter(async () => {
  if (!verify() || type.value === AddressType.None) return;

  const info = {
    address: form.streetAddress,
    country: form.country,
    city: form.state,
    zipCode: form.postcode,
    home: '',
    phone: '',
  };

  checkout.updateAddress(info, type.value);
});

const getLastAddress = () => {
  const id = Number(auth.user.id);
  const address = checkout.getAddress(type.value);

  if (!address) return;

  haveLastAddress.value = true;
  existentId.value = id.toString();
  form.country = address.country;
  form.state = address.city;
  form.streetAddress = address.address;
  form.postcode = address.zipCode;
};

onMounted(() => {
  getLastAddress();
});
</script>

<style scoped>
.address-form {
  @apply;
}

.address-form__wrapper {
  @apply bg-color-2 p-4 rounded-xl relative;
}

.address-form__header {
  @apply mb-8 pb-3;
}

.address-form__title {
  @apply text-sm font-semibold text-color-4 lg:text-xl;
}

.address-form__group {
  @apply mb-4;
}

.address-form__label {
  @apply mb-6 text-dark-800 text-xs font-bold text-color-1 lg:text-sm;
}

.address-form__required {
  @apply ml-1 text-red-500;
}

.address-form__group-btn {
  @apply flex justify-center w-full;
}

.address-btn {
  @apply absolute !w-42;
}
</style>
