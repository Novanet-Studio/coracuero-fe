<template>
  <!-- component -->
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="overflow-hidden rounded-2xl shadow shadow-md shadow-gray-300 relative"
        >
          <div
            class="absolute flex w-full justify-center h-full items-center filter-drop-shadow z-10"
            v-if="isLoading"
          >
            <loading />
          </div>
          <table
            class="min-w-full"
            :class="[isLoading && 'filter-blur-[1px]']"
            v-if="state.invoiceExist && state.tableInvoices?.length"
          >
            <thead class="bg-color-6 border-b">
              <tr>
                <th
                  scope="col"
                  class="text-sm font-bold text-color-7 px-6 py-4 text-left lg:text-base"
                >
                  Nº
                </th>
                <th
                  scope="col"
                  class="text-sm font-bold text-color-7 px-6 py-4 text-left lg:text-base"
                >
                  Factura
                </th>
                <th
                  scope="col"
                  class="text-sm font-bold text-color-7 px-6 py-4 text-left lg:text-base"
                >
                  Fecha
                </th>
                <th
                  scope="col"
                  class="text-sm font-bold text-color-7 px-6 py-4 text-left lg:text-base"
                >
                  Monto
                </th>
                <th
                  scope="col"
                  class="text-sm font-bold text-color-7 px-6 py-4 text-left lg:text-base"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-color-7 border-b transition duration-300 ease-in-out hover:bg-color-8"
                v-for="item in state.tableInvoices"
                :key="item.id"
                @click="goToInvoice(item.id_invoice_user.toString(), item)"
              >
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-bold text-color-6 border p-2 lg:text-base"
                >
                  {{ item.id_invoice_user }}
                </td>
                <td
                  class="text-sm text-color-6 font-light px-6 py-4 whitespace-nowrap lg:text-base"
                >
                  {{ item.payment_id }}
                </td>
                <td
                  class="text-sm text-color-6 font-light px-6 py-4 whitespace-nowrap lg:text-base"
                >
                  {{ item.date }}
                </td>
                <td
                  class="text-sm text-color-6 font-light px-6 py-4 whitespace-nowrap lg:text-base"
                >
                  ${{ item.amount }}
                </td>
                <td
                  class="text-sm text-color-6 font-light px-6 py-4 whitespace-nowrap lg:text-base"
                >
                  <span
                    class="p-2 rounded-md text-xs"
                    :class="item.paid ? 'bg-green-300' : 'bg-color-2'"
                    >{{ item.status }}</span
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div class="flex w-full justify-center pt-12">
    <app-pagination
      :current-page="state.page"
      :per-page="state.perPage"
      :total="state.total"
      @change="setPageInvoice"
      :disabled="isLoading"
      v-if="state.total"
    />
  </div>
</template>

<script lang="ts" setup>
const { $store } = useNuxtApp();
const router = useRouter();
const auth = $store.auth();
const invoice = $store.invoice();

const pageCount = ref(0);
const isLoading = ref(false);

type State = {
  invoiceExist: boolean;
  tableInvoices: InvoiceTableDetail[] | null;
  total: number;
  perPage: string;
  page: string;
};

const state = reactive<State>({
  invoiceExist: false,
  tableInvoices: null,
  total: 0,
  perPage: '10',
  page: '1',
});

const setPageInvoice = (page: string) => (state.page = page);

const goToInvoice = (invoiceId: string, invoiceItem: any) => {
  invoice.invoice = invoiceItem;
  router.push(`/invoices/${invoiceId}`);
};

const getInvoices = async () => {
  isLoading.value = true;
  try {
    const result = await invoice.fetchInvoices(auth.user.id!.toString(), {
      page: state.page,
      pageSize: state.perPage,
    });

    if (!result?.data?.length) {
      state.invoiceExist = false;
      return;
    }

    state.invoiceExist = true;
    state.tableInvoices = invoice.mapped;
    state.total = result.meta?.pagination.total as number;
    pageCount.value = result.meta?.pagination.pageCount as number;
  } catch (error) {
    console.log('An error occurred while fetching invoices');
  } finally {
    isLoading.value = false;
  }
};

watch(
  () => state.page,
  (page) => {
    if (Number(page) > pageCount.value) return;

    getInvoices();
  }
);

onMounted(() => {
  getInvoices();
});
</script>

<style scoped>
.status-color {
  background-color: rgba(216, 255, 154, 0.603);
}

.invoice-hover:hover {
  background-color: #feeed7;
  color: #dd2400;
}
</style>
