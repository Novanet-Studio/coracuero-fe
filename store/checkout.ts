import { defineStore } from 'pinia';
import { AddressType } from '~/types';

interface ShippingInfo {
  email?: string;
  name?: string;
  lastName?: string;
  address?: string;
  home?: string;
  country?: string;
  city?: string;
  zipCode?: string;
  phone?: string;
}

interface CheckoutStore extends ShippingInfo {
  saveInformation: boolean;
}

interface Result {
  hasBilling: Ref<boolean>;
  hasShipping: Ref<boolean>;
}

const defaultState = {
  email: '',
  name: '',
  lastName: '',
  address: '',
  home: '',
  country: '',
  city: '',
  zipCode: '',
  phone: '',
  saveInformation: false,
};

export const useCheckout = defineStore('checkout', {
  state: (): CheckoutStore => ({
    ...defaultState,
  }),
  getters: {
    fullName(): string {
      return `${this.name} ${this.lastName}`;
    },
    fullAddress(): string {
      return `${this.address}, ${this.city}, ${this.zipCode}`;
    },
    shippingAddress(): string {
      return `${this.address} ${this.home}, ${this.city}. Zip Code: ${this.zipCode}. ${this.country}`;
    },
  },
  actions: {
    shippingInfo(info: ShippingInfo) {
      this.email = info.email;
      this.name = info.name;
      this.lastName = info.lastName;
      this.address = info.address;
      this.home = info.home;
      this.country = info.country;
      this.city = info.city;
      this.zipCode = info.zipCode;
      this.phone = info.phone;
    },
    async updateAddress(data: AddressDetail, type: AddressType) {
      const { $notify, $store } = useNuxtApp();
      const { fetchUser } = useStrapiAuth();
      const router = useRouter();
      const user = $store.user();
      const auth = $store.auth();

      if (type === AddressType.Shipping) {
        await user.update({ shipping_address: data });
      } else if (type === AddressType.Billing) {
        await user.update({ billing_address: data });
      } else {
        throw new Error('Invalid address type');
      }

      const userData = await fetchUser();

      Object.assign(auth.user, userData.value);

      $notify({
        group: 'all',
        title: 'Éxito',
        text: 'Dirección actualizada con éxito',
      });

      router.push('/addresses');
    },
    getAddress(type: AddressType): AddressDetail | null {
      if (![AddressType.Billing, AddressType.Shipping].includes(type))
        return null;

      const { $store } = useNuxtApp();
      const auth = $store.auth();

      if (type === AddressType.Billing)
        return auth.user.billing_address as AddressDetail;

      return auth.user.shipping_address as AddressDetail;
    },
    checkAddressType(): Result {
      const { $store } = useNuxtApp();
      const auth = $store.auth();

      const hasBilling = ref(false);
      const hasShipping = ref(false);

      if (auth.user?.billing_address?.country) {
        hasBilling.value = true;
      }

      if (auth.user?.shipping_address?.country) {
        hasShipping.value = true;
      }

      return {
        hasBilling,
        hasShipping,
      };
    },
    reset() {
      this.email = '';
      this.name = '';
      this.lastName = '';
      this.address = '';
      this.home = '';
      this.country = '';
      this.city = '';
      this.zipCode = '';
      this.phone = '';
      this.saveInformation = false;
    },
  },
  persist: {
    storage: persistedState.sessionStorage,
  },,
});
