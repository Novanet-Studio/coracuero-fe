<template>
  <!-- <div class="cart-table-container">
    <table class="cart-table">
      <thead class="cart-table__thead">
        <tr>
          <th class="cart-table__th">Producto</th>
          <th class="cart-table__th">Precio</th>
          <th class="cart-table__th">Cantidad</th>
          <th class="cart-table__th">Total</th>
          <th class="cart-table__th text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td class="cart-table__td-product">
            <product-shopping-cart :product="product" />
          </td>
          <td class="cart-table__td">$ {{ product.price }}</td>
          <td class="cart-table__td">
            <quantity :product="product" />
          </td>
          <td>
            <total-quantity :product="product" />
          </td>
          <td class="cart-table__td">
            <a
              href="#"
              class="cart-table__link"
              @click.prevent="handleRemoveProductFromCart(product)"
            >
              <ph-x weight="light" />
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div> -->
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="overflow-hidden rounded-2xl shadow shadow-md shadow-gray-300"
        >
          <table class="min-w-full">
            <thead class="bg-color-6 border-b">
              <tr>
                <th
                  scope="col"
                  class="text-sm font-bold text-color-7 px-6 py-4 text-left lg:text-base"
                >
                  Producto
                </th>
                <th
                  scope="col"
                  class="text-sm font-bold text-color-7 px-6 py-4 text-left lg:text-base"
                >
                  Precio
                </th>
                <th
                  scope="col"
                  class="text-sm font-bold text-color-7 px-6 py-4 text-left lg:text-base"
                >
                  Cantidad
                </th>
                <th
                  scope="col"
                  class="text-sm font-bold text-color-7 px-6 py-4 text-left lg:text-base"
                >
                  Total
                </th>
                <th
                  scope="col"
                  class="text-sm font-bold text-color-7 px-6 py-4 text-left lg:text-base"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-color-7 border-b transition duration-300 ease-in-out hover:bg-color-8 group"
                v-for="product in products"
                :key="product.id"
              >
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-bold text-color-6 p-2 lg:text-base"
                >
                  <product-shopping-cart
                    image-class="!h-auto"
                    :product="product"
                  />
                </td>
                <td
                  class="text-sm text-color-6 font-light px-6 py-4 whitespace-nowrap lg:text-base"
                >
                  ${{ product.price }}
                </td>
                <td
                  class="text-sm text-color-6 font-light px-6 py-4 whitespace-nowrap lg:text-base"
                >
                  <quantity class="group-hover:bg-white" :product="product" />
                </td>
                <td
                  class="text-sm text-color-6 font-light px-6 py-4 whitespace-nowrap lg:text-base"
                >
                  <total-quantity :product="product" />
                </td>
                <td
                  class="text-sm text-color-6 font-light px-6 py-4 whitespace-nowrap lg:text-base"
                >
                  <a
                    href="#"
                    class="cart-table__link"
                    @click.prevent="handleRemoveProductFromCart(product)"
                  >
                    <ph-x weight="light" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PhX } from '@phosphor-icons/vue';
import { getProductById as GetProductById } from '~/graphql';

type Props = {
  products: ProductsMapped[];
};

defineProps<Props>();

const { $store } = useNuxtApp();
const graphql = useStrapiGraphQL();
const cart = $store.cart();
const productStore = $store.product();

const loadCartProducts = async () => {
  const itemsId = cart.cartItems.map((item) => item.id);

  if (!cart.cartItems.length) {
    productStore.cartProducts = null;
    return;
  }

  const productPromises = itemsId.map((id: string) =>
    graphql<ProductRequest>(GetProductById, { id })
  );

  const [response] = await Promise.all(productPromises);

  productStore.cartProducts = mapperData(response.data.products.data);
};

const handleRemoveProductFromCart = (product: ProductsMapped) => {
  const cartItem = cart.cartItems.find((item) => item.id === product.id);

  cart.removeProductFromCart(cartItem as any);
  // loadCartProducts();
};
</script>

<style scoped>
.cart-table-container {
  @apply overflow-auto rounded-xl;
}

.cart-table {
  @apply w-full mb-4 text-color-6;
}

.cart-table__thead {
  @apply align-bottom rounded-t-2xl bg-color-6;
}

.cart-table__th {
  @apply px-5 py-4 first-letter:uppercase text-[10px] text-white font-semibold align-bottom first:px-1 lg:text-sm;
}

.cart-table__td {
  @apply px-[10px] py-[20px] align-middle text-xs w-[22.5rem] md:text-center lg:text-lg;
}

.cart-table__td-product {
  @apply min-w-52 px-[10px] py-[20px] align-middle text-base w-[22.5rem] md:text-center lg:!w-16;
}

.cart-table__link {
  @apply text-base flex ml-8;
}
</style>
