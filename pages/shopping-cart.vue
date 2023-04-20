<template>
  <section class="shopping-cart">
    <!-- <header class="shopping-cart__header">
      <app-message message="Carrito de compras" />
    </header> -->
    <div class="shopping-cart__wrapper">
      <div class="shopping-cart__container" v-if="cart.cartItems?.length">
        <div>
          <shopping-cart-table
            v-if="product.cartProducts?.length"
            :products="product.cartProducts"
          />
          <p v-else>Carrito vacio</p>
          <div class="shopping-cart__link-wrapper">
            <nuxt-link to="#" class="shopping-cart__link">
              <ph-arrow-left class="mr-2" weight="light" />
              Regresar
            </nuxt-link>
          </div>
        </div>
        <div class="shopping-cart__footer">
          <div></div>
          <div>
            <app-button text="Proceder a la compra" class="mb-16" />
          </div>
        </div>
      </div>
      <div v-else class="shopping-cart__container">
        <header class="shopping-cart__header">
          <h1 class="shopping-cart__title">Carrito de compras</h1>
        </header>
        <div>
          <h3 class="empy-cart">
            No tiene elementos agregado al carrito actualmente
          </h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { PhArrowLeft } from '@phosphor-icons/vue';
import { getProductById as GetProductById } from '~/graphql';

definePageMeta({
  layout: 'layout-account',
});

const graphql = useStrapiGraphQL();
const router = useRouter();
const { $store } = useNuxtApp();

const cart = $store.cart();
const product = $store.product();

const message = inject('title') as Ref<string>;
message.value = 'Carrito de compras';

const goToCheckout = async () => {
  // TODO!: fix routing
  await router.push({
    path: '/checkout',
    force: true,
    replace: true,
  });
  router.go(0);
};

const loadCartProducts = async () => {
  const itemsId = cart.cartItems.map((item) => item.id);

  if (!itemsId.length) return;

  // TODO: move this to store
  // await product.getCartProducts(itemsId);

  if (!cart.cartItems.length) {
    product.cartProducts = null;
    return;
  }

  const productPromises = itemsId.map((id: string) =>
    graphql<ProductsResponse>(GetProductById, { id })
  );

  const [response] = await Promise.all(productPromises);

  product.cartProducts = mapperData(
    response.data.products.data
  ) as ProductsMapped[];
};

onMounted(() => {
  // loadCartProducts();
});
</script>

<style scoped>
.shopping-cart {
  @apply max-w-full lg:mt-12;
}
.shopping-cart__wrapper {
  @apply mt-8 max-w-sm md:max-w-xl lg:(px-4 mt-0 max-w-full);
}
.shopping-cart__container {
  @apply w-full px-3 mx-auto;
}
.shopping-cart__header {
  @apply pb-12 text-center lg:pb-[6.25rem];
}

.shopping-cart__title {
  @apply text-3xl font-semibold text-yellow-400 lg:text-5xl;
}

.shopping-cart__link-wrapper {
  @apply py-[1.875rem] flex flex-row flex-nowrap justify-between;
}

.shopping-cart__link {
  @apply px-6 py-3 text-xs text-color-1 rounded-full border border-color-1 transition ease hover:(bg-color-1 text-white) active:(bg-color-1 text-white) cursor-pointer flex items-center lg:text-sm;
}

.shopping-cart__footer {
  @apply grid lg:grid-cols-3;
}

.shopping-cart__left {
  @apply mb-8 lg:mb-0;
}

.shopping-cart__figcaption {
  @apply relative block text-xl text-dark-200 mb-9;
}

.shopping-cart__btn {
  @apply !bg-transparent border border-yellow-400 mt-4 text-yellow-500 hover:(!bg-yellow-400 text-white);
}

.shopping-cart__right {
}

.shopping-cart__right-wrapper {
  @apply mb-8 px-8 py-7 bg-light-100 border;
}

.shopping-cart__text-wrapper {
  @apply block mb-5 border-b border-light-700 text-dark-100;
}

.shopping-cart__text {
  @apply flex justify-between;
}

.shopping-cart__text {
  @apply flex justify-between;
}

.custom-btn {
  @apply rounded-full !bg-color-1 text-sm !py-2;
}
</style>
