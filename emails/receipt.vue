<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  preview?: string;
  header?: HeaderTemplate;
  body?: BodyTemplate;
  footer?: FooterTemplate;
  theme?: {
    primary: string;
    'primary-top': string;
    secondary: string;
    'secondary-info': string;
    foreground: string;
    info: string;
  };
}

interface HeaderTemplate {
  icon: {
    url: string;
    alt: string;
  };
  rrss: {
    instagram: string;
    phone: string;
    email: string;
  };
}

interface BodyTemplate {
  customer: string;
  email: string;
  orderId: string;
  table: Table;
  payed: string;
  date: string;
}

interface FooterTemplate {
  redirect: {
    text: string;
    link: string;
  };
  /**
   * Object with the needed social networks
   * @example
   * rrss: [
   *   {
   *      icon: 'https://raw.githubcontent/project/icon/png'
   *      link: '@mybussiness'
   *   }
   * ]
   */
  rrss?: Record<string, string>[];
  copyright: {
    text: string;
    location: string;
  };
}

interface Column {
  /**
   * Header of the column
   * @example
   * header: 'Product'
   *
   * */
  header: string;
  /**
   * Key of the column
   * @example
   * key: 'product'
   */
  key: string;
}

interface Table {
  columns: Column[];
  /**
   * Data of the table
   * @example
   * data: [
   *   {
   *     product: 'Product 1',
   *     price: 50
   *   },
   * ]
   */
  data: Record<string, any>[];
}

const props = withDefaults(defineProps<Props>(), {
  preview: 'Coracuero - Recibo de compra',
  header: () => ({
    icon: {
      url: 'https://raw.githubusercontent.com/Novanet-Studio/coracuero-fe/main/static/favicon.png',
      alt: 'Coracuero',
    },
    rrss: {
      email: 'coracuero@gmail.com',
      instagram: '@coracuero',
      phone: '+58 412-2347585',
    },
  }),
  // body: () => ({
  //   customer: "Juan Perez",
  //   date: new Date("June 23, 2022 4:06:00 pm UTC"),
  //   orderId: "123456",
  //   email: "ccsmultisport@gmail.com",
  //   payed: "123",
  //   table: {
  //     columns: [
  //       {
  //         header: "Producto",
  //         key: "product",
  //       },
  //       {
  //         header: "Precio",
  //         key: "price",
  //       },
  //       {
  //         header: "Cantidad",
  //         key: "quantity",
  //       },
  //     ],
  //     data: [
  //       {
  //         product: "Pantalon",
  //         price: 50,
  //         quantity: 1,
  //       },
  //     ],
  //   },
  // }),
  footer: () => ({
    redirect: {
      link: 'https://coracuerp.netlify.app/',
      text: 'Ir a la tienda',
    },
    rrss: [
      {
        icon: 'https://raw.githubusercontent.com/Novanet-Studio/cmstem-fe/develop/static/email/x.png',
        link: '#',
      },
      {
        icon: 'https://raw.githubusercontent.com/Novanet-Studio/cmstem-fe/develop/static/email/facebook.png',
        link: '#',
      },
      {
        icon: 'https://raw.githubusercontent.com/Novanet-Studio/cmstem-fe/develop/static/email/whatsapp.png',
        link: '#',
      },
    ],
    copyright: {
      text: '© 2022 Coracuero',
      location: 'Caracas, Venezuela',
    },
  }),
});

// const formattedDate = computed(() =>
//   new Intl.DateTimeFormat("en", {
//     dateStyle: "medium",
//     timeStyle: "medium",
//   }).format(props.body?.date)
// );

const headers = props.body?.table.columns.map((col) => col.header);
const newKeys = props.body?.table.columns.map((col) => col.key);
const newValues = props.body?.table.data.map((row) => row);

const items = computed(() => {
  return newValues?.map((v: any) => {
    const items: string[] = [];

    newKeys?.forEach((k) => {
      items.push(v[k]);
    });

    return items;
  });
});

function getFirstUppercase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
</script>

<template>
  <ETailwind
    :config="{
      theme: {
        extend: {
          colors: {
            primary: '#000000',
            'primary-top': '#292929',
            secondary: '#707070',
            'secondary-info': '#ffffff',
            foreground: '#efeef1',
            info: '#acb5cb',
          },
        },
      },
    }"
  >
    <EHtml>
      <EHead />
      <EPreview>{{ preview }}</EPreview>
      <EBody class="bg-foreground font-sans">
        <EContainer class="max-w-[580px] mx-auto my-8 bg-white">
          <ESection class="w-full flex">
            <ERow>
              <EColumn class="h-3 bg-primary-top w-[249px]" />
              <EColumn class="h-3 bg-primary-top w-[102px]" />
              <EColumn class="h-3 bg-primary-top w-[249px]" />
            </ERow>
          </ESection>
          <ESection class="bg-primary w-full">
            <ERow class="max-w-[200px] w-[114px] mx-auto block">
              <EColumn align="center">
                <EImg
                  class="mt-3"
                  width="114"
                  :src="header.icon.url"
                  :alt="header.icon.alt"
                />
              </EColumn>
            </ERow>
          </ESection>
          <ESection class="w-full bg-primary">
            <ERow class="mb-2 mx-auto">
              <EColumn align="center">
                <EText class="my-0 text-info mt-2"
                  ><b>Instagram</b> {{ header.rrss.instagram }}</EText
                >
                <EText class="my-0 text-info"
                  ><b>Teléfono</b> {{ header.rrss.phone }}</EText
                >
                <EText class="my-0 text-info mb-4"
                  ><b>Email</b> {{ header.rrss.email }}</EText
                >
              </EColumn>
            </ERow>
          </ESection>
          <ESection>
            <EText class="font-bold text-[#80817f] text-sm mb-1" align="center"
              >¡Gracias por su compra!</EText
            >
            <EText class="font-bold text-[#80817f] text-xs my-1" align="center"
              >Recibo de compra</EText
            >
            <EText class="font-bold text-[#80817f] text-xs" align="center">
              {{ body?.date }}
            </EText>
          </ESection>
          <ESection class="max-w-[480px] mx-auto mb-8">
            <EText class="text-[#80817f] text-sm my-1" align="left"
              ><b>Cliente: </b> {{ body?.customer }}</EText
            >
            <EText class="text-[#80817f] text-sm my-1" align="left"
              ><b>Email: </b> {{ body?.email }}</EText
            >
            <EText class="text-[#80817f] text-sm my-1" align="left"
              ><b>Orden: </b> {{ body?.orderId }}</EText
            >
          </ESection>
          <ESection class="mt-4">
            <ERow
              class="max-w-[450px] mx-auto border-none border-b border-t border-solid border-b-black"
            >
              <EColumn
                class="w-[150px]"
                v-for="(key, index) in headers"
                :key="index"
              >
                <EText align="center">
                  <span class="font-bold">{{ getFirstUppercase(key) }}</span>
                </EText>
              </EColumn>
            </ERow>
            <ERow
              class="max-w-[450px] mx-auto border-b border-solid border-b-black/20"
              v-for="(item, index) in items"
              :key="index"
            >
              <EColumn
                class="w-[150px]"
                v-for="(_, index) in newKeys"
                :key="index"
              >
                <EText class="text-center">{{ item[index] }}</EText>
              </EColumn>
            </ERow>
          </ESection>

          <ESection
            class="py-4 bg-secondary max-w-[450px] mx-auto my-8 rounded-md"
          >
            <ERow>
              <EText
                class="text-base font-bold text-secondary-info"
                align="center"
                ><span class="uppercase font-extrabold text-base">total</span>
                ${{ body?.payed }}</EText
              >
            </ERow>
          </ESection>
        </EContainer>

        <ESection class="max-w-[580px] mx-auto">
          <ERow class="mb-5">
            <EColumn align="center" class="w-full mx-auto">
              <ELink
                class="underline text-gray-600"
                :href="footer.redirect.link"
                target="_blank"
                >{{ footer.redirect.text }}</ELink
              >
            </EColumn>
          </ERow>
          <ERow>
            <EColumn align="center" class="w-full">
              <ELink
                :href="item.link"
                v-for="(item, index) in footer.rrss"
                :key="index"
              >
                <EImg
                  width="30"
                  class="inline-block first:mrl-0 mx-2 last:mr-0"
                  :src="item.icon"
                />
              </ELink>
            </EColumn>
          </ERow>
          <EText class="text-center text-[#706a7b]">
            {{ footer.copyright.text }} <br />
            {{ footer.copyright.location }}
          </EText>
        </ESection>
      </EBody>
    </EHtml>
  </ETailwind>
</template>
