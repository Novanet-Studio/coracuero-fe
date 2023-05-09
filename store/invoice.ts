import { defineStore } from 'pinia';
import {
  createInvoice as CreateInvoice,
  getInvoicesByUserId as GetInvoicesByUserId,
  getProductById as GetProductById,
} from '~/graphql';
import type { OrderResponseBody } from '@paypal/paypal-js';

type InvoiceStore = {
  loading: boolean;
  invoices: InvoicesMapped[] | null;
  invoice: InvoiceTableDetail | null;
  products: ProductsMapped[] | null;
};

const PAGE_LIMIT = 10;
const DEFAULT_PAGE = 1;

const invoiceMapperHelper = (
  invoice: InvoicesMapped,
  index: number
): InvoiceTableDetail => {
  const invoices = {
    ...invoice,
    id_invoice_user: index + 1,
    date: new Date(invoice.createdAt as unknown as string).toLocaleDateString(
      'es-VE'
    ),
    status: invoice.paid ? 'Pagado' : 'Pendiente',
  };

  return invoices as unknown as InvoiceTableDetail;
};

interface FetchInvoicesReturn {
  data: InvoicesMapped[] | undefined;
  meta: Meta | null;
}

interface Options {
  page: number;
  pageSize: number;
}

export const useInvoice = defineStore('invoice', {
  state: () =>
    ({
      loading: false,
      invoice: null,
      invoices: null,
      products: [],
    } as InvoiceStore),
  getters: {
    mapped(): InvoiceTableDetail[] {
      if (!this.invoices) return [];
      return this.invoices?.map(invoiceMapperHelper);
    },
  },
  actions: {
    async fetchInvoices(
      userId: string,
      options?: Options
    ): Promise<FetchInvoicesReturn> {
      const graphql = useStrapiGraphQL();
      const id = Number(userId);

      const response = await graphql<InvoicesRequest>(GetInvoicesByUserId, {
        id,
        page: options?.page ?? DEFAULT_PAGE,
        pageSize: options?.pageSize ?? PAGE_LIMIT,
      });

      if (!response.data.invoices?.data?.length) {
        return {
          data: [],
          meta: null,
        };
      }

      const mapped = mapperData<InvoicesMapped[]>(response.data.invoices.data);

      this.invoices = mapped;

      return {
        data: mapped,
        meta: response.data.invoices.meta,
      };
    },
    async createInvoice(order: OrderResponseBody, items: any[]) {
      const { $store } = useNuxtApp();
      const graphql = useStrapiGraphQL();
      const auth = $store.auth();
      const checkout = $store.checkout();
      const orderAddress = order.purchase_units[0].shipping?.address;
      const address = {
        phone: checkout.phone,
        home: checkout.home,
        country: orderAddress?.country_code,
        locality: orderAddress?.admin_area_2,
        postalCode: orderAddress?.postal_code,
        addressLine1: orderAddress?.address_line_1,
      };

      const paymentInfo = {
        first_name: order.payer.name?.given_name,
        last_name: order.payer.name?.surname,
        email: order.payer.email_address,
        confirmation_id: order.id,
        amount: order.purchase_units[0].amount.value,
        payment_date: order.create_time,
      };

      const body = {
        amount: +order.purchase_units[0].amount.value,
        order_id: order.purchase_units[0].invoice_id,
        paid: true,
        payment_id: order.id,
        products: items,
        users_permissions_user: Number(auth.user.id),
        shippingAddress: address,
        payment_info: [paymentInfo],
        payment_method: 'paypal',
      };

      const { data } = await graphql<Invoice>(CreateInvoice, {
        invoice: body,
      });

      return data;
    },
    async loadInvoiceProducts() {
      try {
        this.loading = true;
        const graphql = useStrapiGraphQL();
        const temp: ProductsMapped[] = [];

        if (!this.invoice?.products.length) return [];

        const itemsId = this.invoice.products.map(
          (product) => product.product_id
        );
        const productPromises = itemsId.map((id) =>
          graphql<ProductRequest>(GetProductById, { id })
        );

        const response = await Promise.all(productPromises);
        const result = mapperData<any[]>(response);

        result.forEach((product) => {
          temp.push(product.products[0]);
        });

        this.products = temp;
      } catch (error: any) {
        throw new Error(error);
      } finally {
        this.loading = false;
      }
    },
  },
  persist: true,
});
