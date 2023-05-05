import { defineStore } from 'pinia';
import { updateUser as UpdateUser } from '~/graphql';

export const useUser = defineStore('user-store', {
  actions: {
    async update(payload: Partial<User>) {
      const { $store } = useNuxtApp();
      const auth = $store.auth();
      const graphql = useStrapiGraphQL();

      await graphql(UpdateUser, {
        id: Number(auth.user!.id),
        input: payload,
      });

      // useStrapiUser();
    },
  },
});
