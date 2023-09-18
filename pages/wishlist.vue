<template>
  <section class="wishlist">
    <div class="wishlist__center">
      <!-- <header class="wishlist__header">
        <h1 class="wishlist__title">Lista de deseos</h1>
      </header> -->
      <div v-if="!productStore.wishlistItems">
        <header class="wishlist__center">
          <h3 class="wishlist__subtitle">
            No tienes articulos en tu lista de deseos
          </h3>
        </header>
      </div>
      <div class="flex flex-col" v-else>
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
                      Precio por unidad
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
                    class="bg-color-6 border-b transition duration-300 ease-in-out hover:bg-color-6 group"
                    v-for="item in productStore.wishlistItems"
                    :key="item.id"
                  >
                    <td
                      class="px-6 py-4 text-sm font-bold text-color-6 p-2 flex items-center gap-2 lg:(text-base gap-4)"
                    >
                      <nuxt-link
                        class="flex h-14 w-14 justify-center items-center lg:(h-20 w-20)"
                        :class="class"
                        :to="`/product/${item.id}`"
                      >
                        <nuxt-img
                          :src="item.images[0].formats?.small.url"
                          :alt="item.name"
                          :placeholder="[100, 50, 10]"
                          sizes="sm:100vw md:50vw lg:200px"
                          fit="outside"
                          class="h-full object-contain"
                        />
                      </nuxt-link>
                      <p class="text-color-1 lg:text-lg">{{ item.name }}</p>
                    </td>
                    <td
                      class="text-sm text-color-2 font-light px-6 whitespace-nowrap lg:text-base min-w-12rem"
                    >
                      $ {{ item.price.toFixed(2) }}
                    </td>
                    <td
                      class="text-sm text-color-6 font-light px-6 py-4 lg:text-base"
                    >
                      <div class="flex gap-2 items-center">
                        <app-button
                          class="!w-38"
                          @click="handleAddToCart(item)"
                        >
                          Añadir al carrito
                        </app-button>
                        <a
                          href="#"
                          class="w-table__action-delete"
                          @click.prevent="handleRemoveItemFromWishlist(item)"
                        >
                          <ph-x class="text-xl" weight="light" />
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { PhX } from '@phosphor-icons/vue';
import { getProductById as GetProductById } from '~/graphql';

definePageMeta({
  layout: 'layout-account',
});

const { $notify, $store } = useNuxtApp();
const graphql = useStrapiGraphQL();
const wishlist = $store.wishlist();
const productStore = $store.product();
const cart = $store.cart();

const message = inject('title') as Ref<string>;
message.value = 'Lista de deseos';

const handleAddToCart = async (product: any) => {
  const item = {
    id: product.id,
    quantity: 1,
    price: product.price,
  };

  cart.addProductToCart(item);

  const itemsList = cart.cartItems.map((item) =>
    graphql<ProductRequest>(GetProductById, { id: item.id })
  );

  const itemsResult = await Promise.all(itemsList);

  const temp: any[] = [];

  mapperData<any[]>(itemsResult).forEach((item) => {
    temp.push(item.products[0]);
  });

  productStore.addCartProducts(temp);

  $notify({
    group: 'all',
    title: 'Exito!',
    text: `${product.name} ha sido agregado al carrito!`,
  });

  handleRemoveItemFromWishlist(product, false);
};

const handleRemoveItemFromWishlist = (product: any, notify = true) => {
  wishlist.removeItemFromWishlist(product);
  loadWishlist();

  if (!notify) return;

  $notify({
    group: 'all',
    title: 'Eliminado',
    text: `${product.name} ha sido eliminado de la lista de deseos!`,
  });
};

const loadWishlist = async () => {
  const temp: any[] = [];

  if (!wishlist?.items?.length) {
    productStore.wishlistItems = null;
    return;
  }

  const itemsId = wishlist.items.map((item) => item.id);
  const wishlistPromises = itemsId.map((id: string) =>
    graphql<ProductRequest>(GetProductById, { id })
  );

  const response = await Promise.all(wishlistPromises);

  mapperData<any[]>(response).forEach((item) => {
    temp.push(item.products[0]);
  });

  productStore.wishlistItems = temp;
};

onMounted(() => {
  loadWishlist();
});
</script>

<style scoped>
.price {
  text-align: center;
  margin: 0 auto;
}

.wishlist {
  @apply mt-2 w-full sm:(max-w-lg mb-24) lg:(px-7 mt-12 max-w-full);
}

.wishlist__center {
  @apply w-full px-3 mx-auto;
}

.wishlist__header {
  @apply pb-12 text-left lg:pb-24;
}

.wishlist__title {
  @apply text-3xl font-semibold text-yellow-400 lg:text-5xl;
}

.wishlist__subtitle {
  @apply text-center mt-12 text-sm text-color-4 mb-2 font-bold lg:(text-2xl text-left mt-0);
}

.w-table-wrapper {
  @apply overflow-auto;
}

.w-table {
  @apply w-full border-collapse border-collapse mb-4 text-dark-300;
}

.w-table__thead {
  @apply align-bottom col-span-12;
}

.w-table__tr {
  @apply border-current border-solid border-0;
}

.w-table__th-name {
  @apply border-b-2 border-b-gray-100 border-t-2 border-t-gray-100 bg-white uppercase text-[#e36d65] align-middle text-center font-semibold text-sm;
}

.w-table__th-price {
  @apply border-b-2 border-b-gray-100 border-t-2 border-t-gray-100 bg-white uppercase text-[#e36d65] text-center py-3 font-semibold text-sm;
}

.w-table__th-action {
  @apply border-b-2 border-b-gray-100 border-t-2 border-t-gray-100 bg-white uppercase text-[#e36d65] text-center font-semibold text-sm align-middle;
}

.w-table__td-product {
  @apply min-w-[200px] px-[10px] py-[30px] lg:(align-middle);
}

.w-table__td-price {
  @apply min-w-[200px] px-[10px] py-[30px] align-middle text-center lg:w-40;
}

.w-table__td-action {
  @apply min-w-[300px] px-[10px] py-[30px] lg:w-[35%];
}

.w-table__action-btn {
  @apply inline-block px-8 py-3 rounded-sm transition ease bg-yellow-400 text-white active:bg-yellow-500 hover:bg-yellow-500;
}

.w-table__action-delete {
  @apply ml-4 text-red-700 inline-block;
}
</style>
