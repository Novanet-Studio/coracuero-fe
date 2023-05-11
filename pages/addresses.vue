<template>
  <div class="lg:ml-8">
    <div class="address">
      <div class="address__content">
        <figure>
          <figcaption class="address__figcaption">
            Dirección de facturación
          </figcaption>
          <template v-if="hasBilling">
            <div class="address-wrapper">
              <p class="address__text">
                ¿Deseas actualizar tu dirección de facturación?
              </p>
              <div class="address__link-wrapper">
                <nuxt-link class="address__link" to="/edit-address?add=billing">
                  Actualizar
                </nuxt-link>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="address-wrapper">
              <p class="address__text">
                No has registrado ningun dirección de facturación
              </p>
              <div class="address__link-wrapper">
                <nuxt-link class="address__link" to="/edit-address?add=billing">
                  Agregar
                </nuxt-link>
              </div>
            </div>
          </template>
        </figure>
      </div>
      <div class="address__content">
        <figure>
          <figcaption class="address__figcaption">
            Dirección de envío
          </figcaption>
          <template v-if="hasShipping">
            <div class="address-wrapper">
              <p class="address__text">
                ¿Deseas actualizar tu dirección de envío?
              </p>
              <div class="address__link-wrapper">
                <nuxt-link
                  class="address__link"
                  to="/edit-address?add=shipping"
                >
                  Actualizar
                </nuxt-link>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="address-wrapper">
              <p class="address__text">
                No has registrado ningun dirección de envío
              </p>
              <div class="address__link-wrapper">
                <nuxt-link
                  class="address__link"
                  to="/edit-address?add=shipping"
                >
                  Agregar
                </nuxt-link>
              </div>
            </div>
          </template>
        </figure>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'layout-account',
  middleware: 'authentication',
});

const message = inject('title') as Ref<string>;
message.value = 'Direccion';

const { $store } = useNuxtApp();
const checkout = $store.checkout();
const { hasBilling, hasShipping } = checkout.checkAddressType();
</script>

<style scoped>
.address {
  @apply flex flex-col gap-10 p-5 lg:(flex-row gap-8);
}

.address__content {
  @apply w-full;
}

.address__figcaption {
  @apply mb-5 pb-3 text-sm font-semibold text-color-4 font-bold lg:text-xl;
}
.address__text {
  @apply mb-1 text-color-1 text-xs text-center lg:(text-sm mb-2);
}

.address__link {
  @apply text-xs -bottom-4 transition ease absolute font-semibold bg-color-1 p-2 px-6 text-white rounded-full shadow-xl lg:(text-sm px-10 -bottom-4);
}

.address__link-wrapper {
  @apply flex justify-center;
}

.address-wrapper {
  @apply bg-color-8 p-12 rounded-xl relative shadow-xl lg:p-12;
}
</style>
