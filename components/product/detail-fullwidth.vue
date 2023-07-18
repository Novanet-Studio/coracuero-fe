<template>
  <div class="detail flex gap-4">
    <div
      class="ps-product__header bg-color-6 shadow-md containerrounded-xl relative flex flex-col md:flex-row lg:mx-auto"
    >
      <div class="flex justify-center p-2 md:p-4 lg:(p-14 pb-18)">
        <thumbnail-default :product="product" />
      </div>
      <section class="my-4 mx-4 lg:py-10 lg:pb-12 text-color-1">
        <h4 class="text-lg text-color-1 font-bold lg:text-2xl">
          {{ product.name }}
        </h4>
        <h5 class="text-xs font-bold mt-4 lg:text-lg">Descripción</h5>
        <div
          class="text-xs lg:text-sm list-circle children:list-disc"
          v-html="markdown.render(product?.description ?? '')"
        ></div>
        <h5 class="text-xs font-bold mt-4 lg:text-lg">Tamaños</h5>
        <div
          class="text-xs lg:text-sm"
          v-html="markdown.render(product?.size ?? '')"
        ></div>
        <h5 class="text-xs font-bold mt-4 lg:text-lg">Material</h5>
        <div
          class="text-xs lg:text-sm"
          v-html="markdown.render(product?.materials ?? '')"
        ></div>
        <div class="my-4" v-if="product.colors?.length">
          <h4 class="font-bold mb-2">Selecciona el color:</h4>
          <button
            v-for="color in product.colors"
            @click.prenvent="colorId = color.id"
          >
            <img
              class="w-6 mr-3 rounded-full ring-2 transition ring-offset-2 hover:ring-dark"
              :class="color.id === colorId ? 'ring-dark' : 'ring-transparent'"
              :src="color.image.url"
              :alt="color.name"
            />
          </button>
        </div>
        <product-shopping :product="product" :color-id="colorId" />
        <thumbnail :product="product" />
      </section>
      <div class="py-3 mb-4 mt-4 flex justify-center absolute -bottom-4 w-full">
        <app-button
          class="absolute -bottom-5 rounded-full !w-[50%] !bg-color-1 text-xs md:!w-[30%] lg:!w-[15%] lg:text-sm"
          @click="handleBuy"
          >Comprar</app-button
        >
      </div>
    </div>
    <!-- <information-default :product="product" /> -->
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import MarkdownIt from 'markdown-it';

interface Props {
  product: ProductsMapped;
}

const props = defineProps<Props>();

const { $notify, $store } = useNuxtApp();
const cart = $store.cart();
const router = useRouter();
const markdown = new MarkdownIt();
const thumbsSwiper = ref(null);
const quantity = ref(1);
const colorId = ref('');

provide('thumbs', thumbsSwiper);
provide('quantity', quantity);

function handleBuy() {
  const existItem = cart.cartItems.find((item) => item.id === props.product.id);

  if (!colorId.value) {
    $notify({
      group: 'all',
      title: 'Advertencia!',
      text: `Debe seleccionar un color`,
    });
    return;
  }

  const item = {
    id: props.product.id,
    quantity: quantity.value,
    price: props.product.price,
    color: colorId.value,
  };

  if (!existItem) {
    addItemToCart(item);
    goToCheckout();
    return;
  }

  const isQuantityGreaterThanTen = quantity.value + existItem.quantity > 10;

  if (!isQuantityGreaterThanTen) {
    addItemToCart(item);
    goToCheckout();
    return;
  }

  $notify({
    group: 'all',
    title: 'Advertencia!',
    text: `No puede añadir más de 10 elementos`,
  });
}

const goToCheckout = () => setTimeout(() => router.push('/checkout'), 500);

async function addItemToCart(payload: any) {
  cart.addProductToCart(payload);

  if (!cart.cartItems.length) return;

  // const itemsId = cart.cartItems.map((item) => item.id);

  $notify({
    group: 'all',
    title: 'Exito!',
    text: `${props.product.name} ha sido agregado al carrito!`,
  });
}
</script>
