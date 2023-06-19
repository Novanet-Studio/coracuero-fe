<template>
  <div class="flex min-h-full mt-12 lg:mx-24">
    <div class="product2 mx-auto lg:w-full">
      <Transition name="product">
        <product-detail-fullwidth
          v-if="state.product"
          :product="state.product"
        />
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getProductById as GetProductById } from '~/graphql';

definePageMeta({
  pageTransition: {
    name: 'page',
  },
});

type State = {
  productId: string;
  pageLoading: boolean;
  product: ProductsMapped | null;
};

const { $store, $notify } = useNuxtApp();
const graphql = useStrapiGraphQL();
const route = useRoute();
const global = $store.global();

const state = reactive<State>({
  productId: route.params.id as string,
  pageLoading: true,
  product: null,
});

const loadProductById = async () => {
  try {
    state.pageLoading = true;

    const { data } = await graphql<ProductRequest>(GetProductById, {
      id: state.productId,
    });

    state.product = mapperData(data.products.data[0]);
  } catch (error) {
    $notify({
      group: 'all',
      title: 'Error',
      text: 'Hubo un problema al intentar cargar el producto',
    });
  } finally {
    state.pageLoading = false;
  }
};

onMounted(() => {
  loadProductById();
  global.appDrawer = false;
});
</script>
