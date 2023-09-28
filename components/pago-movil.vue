<template>
  <section>
    <template v-show="false">
      <div>
        <figure>
          <p>Nombre:</p>
          <p>Numero de telefono:</p>
          <p>Banco:</p>
          <p>RIF:</p>
          <p>Motivo:</p>
        </figure>
        <figure>
          <figcaption>
            <strong>Subtotal en Bs</strong>
            <small>24.40</small>
          </figcaption>
        </figure>
      </div>
      <div>
        <strong
          >No disponemos de este metodo actualmente, por favor, seleccione
          otro.</strong
        >
      </div>
    </template>
    <form @submit.prevent="submit">
      <div class="form__group">
        <label class="form__label"
          >Nombre del titular de cuenta<sup class="form__required"
            >*</sup
          ></label
        >
        <app-input
          v-model="formData.name"
          placeholder="john"
          :is-error="status.name.isError"
          :error-message="status.name.message"
        />
      </div>
      <div class="form__group">
        <label class="form__label"
          >Apellido del titular de cuenta<sup class="form__required"
            >*</sup
          ></label
        >
        <app-input
          v-model="formData.lastName"
          placeholder="doe"
          :is-error="status.lastName.isError"
          :error-message="status.lastName.message"
        />
      </div>
      <div class="form__group">
        <label class="form__label"
          >Fecha<sup class="form__required">*</sup></label
        >
        <app-input
          v-model="formData.date"
          type="date"
          :is-error="status.date.isError"
          :error-message="status.date.message"
        />
      </div>
      <div class="form__group">
        <label class="form__label"
          >Monto en Bs<sup class="form__required">*</sup></label
        >
        <p class="text-xs font-bold md:text-sm lg:text-base">
          La tasa del día BCV es de {{ bcvUsd }} BsD. El monto del pago debe ser
          de {{ amountRate }}
        </p>
        <app-input
          v-model="formData.amountPayed"
          type="number"
          :is-error="status.amountPayed.isError"
          :error-message="status.amountPayed.message"
        />
      </div>
      <div class="form__group">
        <label class="form__label"
          >Numero de confirmacion<sup class="form__required">*</sup></label
        >
        <app-input
          v-model.number="formData.confirmation"
          type="text"
          :is-error="status.confirmation.isError"
          :error-message="status.confirmation.message"
        />
      </div>
      <p class="text-xs mb-6 mx-6 md:text-sm lg:(text-base mx-0)">
        Al realizar esta compra usted acepta
        <a href="#" class="text-color-1 font-bold"
          >nuestros términos y condiciones</a
        >.
      </p>
      <div class="form__btn-group">
        <app-button
          btn-type="submit"
          text="Enviar"
          @click="submit"
          :disabled="isError || !verify() || sending"
        />
      </div>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { useForm } from 'slimeform';
import * as yup from 'yup';
import { yupFieldRule } from 'slimeform/resolvers';
import { createInvoice as CreateInvoice } from '~/graphql';

const { $store, $notify } = useNuxtApp();
const router = useRouter();
const graphql = useStrapiGraphQL();
const cart = $store.cart();
const auth = $store.auth();
const checkout = $store.checkout();
const product = $store.product();
const bcvUsd = ref<number>(0);
const amountRate = ref<number>(0);
const loadingBcvUsd = ref<boolean>(false);
const sending = ref<boolean>(false);
const productsCart = ref<ProductsMapped[]>([]);
const productsMail = ref<ProductsMapped[]>([]);

const {
  form: formData,
  status,
  submitter,
  verify,
  isError,
} = useForm({
  form: () => ({
    name: '',
    lastName: '',
    date: '',
    amountPayed: '',
    confirmation: '',
  }),
  rule: {
    name: yupFieldRule(yup.string().required('El campo es obligatorio')),
    lastName: yupFieldRule(yup.string().required('El campo es obligatorio')),
    date: yupFieldRule(yup.string().required('El campo es obligatorio')),
    amountPayed: yupFieldRule(
      yup
        .string()
        .test(
          'must-be-equal',
          'La cantidad no es igual al monto especificado',
          (value) => {
            return value === amountRate.value.toString();
          }
        )
        .required('El campo es obligatorio')
    ),
    confirmation: yupFieldRule(
      yup.string().required('El campo es obligatorio')
    ),
  },
  defaultMessage: '',
});

async function createInvoice(payment: any, products: CartItem[]) {
  const productName = productsCart.value;
  const filterProducts: any[] = [];

  products.forEach((product) => {
    const found = productName.find((item) => item.id === product.id);

    if (found) {
      filterProducts.push({
        quantity: Number(product.quantity),
        product_id: product.id.toString(),
        product_name: found.name,
        color: product.color,
      });
    }
  });

  const addressData = {
    phone: checkout.phone,
    home: checkout.home,
    country: checkout.country,
    locality: checkout.city,
    postalCode: checkout.zipCode,
    addressLine1: checkout.address,
  };

  const paymentInfo = {
    ...payment,
    confirmation_id: payment.confirmation_id,
    email: checkout.email,
  };

  delete paymentInfo.orderId;

  const data = {
    // Amount in USD
    amount: cart.amount,
    order_id: payment.orderId,
    paid: false,
    payment_id: payment.confirmation_id,
    products: filterProducts,
    user: Number(auth.user.id),
    shipment_address: addressData,
    payment_info: [paymentInfo],
    payment_method: 'pago_movil',
  };

  const result = await graphql<CreateInvoiceRequest>(CreateInvoice, {
    invoice: data,
  });

  return result;
}

const { submit } = submitter(async () => {
  if (!verify()) return;

  try {
    sending.value = true;

    if (Date.parse(formData.date) > Date.parse(new Date().toISOString())) {
      $notify({
        group: 'all',
        title: 'Error!',
        text: `El monto del pago debe ser de ${amountRate.value} y la fecha debe concordar con el dia de hoy!`,
      });
      return;
    }

    const paymentData = {
      orderId: crypto.randomUUID(),
      first_name: formData.name,
      last_name: formData.lastName,
      confirmation_id: formData.confirmation.toString(),
      amount: Number(formData.amountPayed),
      payment_date: formData.date,
    };

    const invoiceItems = cart.cartItems;
    await createInvoice(paymentData, invoiceItems);

    $notify({
      group: 'all',
      title: 'Éxito',
      text: 'La orden se ha generado, se encuentra pendiente en aprobación',
    });

    sendInvoiceEmail(invoiceItems, paymentData);
  } catch (error) {
    console.log(
      'Was an error while sending `pago-movil` payment report, ',
      error
    );
  } finally {
    sending.value = false;
  }
});

async function sendInvoiceEmail(products: CartItem[], payment: any) {
  try {
    const productsList: Record<string, any>[] = [];
    const productItems: any[] = [];
    const created = new Date(payment.date).toLocaleDateString();
    const amountPayed = `$${Number(payment.amount) / amountRate.value} USD`;

    products.forEach((item) => {
      const productFinded = productsMail.value.find(
        (mailProduct) => mailProduct.id == item.id
      );

      if (productFinded) {
        productItems.push({
          quantity: item.quantity,
          name: `${productFinded.name} / ${item.color}`,
          amount: item.price,
          description: productFinded.description,
        });

        productsList.push({
          name: productFinded.name,
          price: item.price,
          quantity: item.quantity,
        });
      }
    });

    const orderId = `${payment.orderId} (PENDIENTE EN APROBACION)`;

    const merchant = {
      payed: amountPayed,
      email: auth.user.email,
      phone: checkout.phone,
      shipping: checkout.shippingAddress,
      customer: checkout.fullName,
      date: created,
      table: {
        columns: [
          { header: 'Producto', key: 'name' },
          { header: 'Precio', key: 'price' },
          { header: 'Cantidad', key: 'quantity' },
        ],
        data: productsList,
      },
      orderId: orderId,
    };

    const receipt = {
      payed: amountPayed,
      // email: 'novanet@mailinator.com',
      email: auth.user.email,
      customer: checkout.fullName,
      date: created,
      orderId: orderId,
      table: {
        columns: [
          { header: 'Producto', key: 'name' },
          { header: 'Precio', key: 'price' },
          { header: 'Cantidad', key: 'quantity' },
        ],
        data: productsList,
      },
    };

    await Promise.all([
      useFetch('/api/send-receipt-email', {
        method: 'post',
        body: receipt,
      }),
      useFetch('/api/send-merchant-email', {
        method: 'post',
        body: merchant,
      }),
    ]);

    $notify({
      group: 'all',
      title: 'Orden de compra generada',
      text: '¡Gracias por preferirnos!',
    });

    setTimeout(() => {
      cart.clearCartItems();
      router.push('/invoices');
    }, 1000);
  } catch (err) {
    console.log('sendInvoiceEmail Error: ', err);
    $notify({
      group: 'all',
      title: 'Error',
      text: '¡Hubo un error al enviar el email!',
    });
  }
}

const calculateAmountToPay = () => {
  const amount = bcvUsd.value * cart.amount;
  amountRate.value = amount;
};

const getBCVUsd = async () => {
  const url = 'https://api.exchangedyn.com/markets/quotes/usdves/bcv';
  loadingBcvUsd.value = true;
  try {
    const response = await fetch(url);
    const data: BcvUsdResponse = await response.json();
    const mount = data.sources.BCV.quote.substring(0, 5);

    bcvUsd.value = parseFloat(mount);

    calculateAmountToPay();
  } catch (error) {
    console.log('Was an error fetching bcv usd dollar value');
  } finally {
    loadingBcvUsd.value = false;
  }
};

const getProducts = async () => {
  const itemsId = cart.cartItems.map((item) => item.id);
  const hasCartProducts = product.cartProducts?.length;

  if (!itemsId.length || !cart.cartItems.length) return;

  if (!hasCartProducts) {
    // fill from server
  }

  productsMail.value = product.cartProducts as ProductsMapped[];
  productsCart.value = product.cartProducts as ProductsMapped[];

  // const productPromises = itemsId.map((id: string) =>
  //   graphql<ProductRequest>(GetProductById, { id })
  // );

  // const response = await Promise.all(productPromises);
  // let products: Product[] = [];

  // response.forEach((res) => {
  //   products = res.data.products.data;
  // });

  // state.productMail = products;
  // state.productsCart = products;
};

onMounted(() => {
  getBCVUsd();
  getProducts();
});
</script>
