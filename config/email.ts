export function receiptTemplateConfig() {
  return {
    subject: 'Coracuero recibo de compra - Order ID: %orderId%',
    text: 'Coracuero recibo de compra',
    template: {
      preview: 'Coracuero - Recibo de compra',
      theme: {
        primary: '#000000',
        primaryTop: '#292929',
        secondary: '#707070',
        secondaryInfo: '#ffffff',
        foreground: '#efeef1',
        info: '#acb5cb',
      },
      header: {
        icon: {
          url: 'https://raw.githubusercontent.com/Novanet-Studio/coracuero-fe/main/static/favicon.png',
          alt: 'Coracuero',
        },
        contact: {
          email: 'coracuero@gmail.com',
          instagram: '@coracuero',
          phone: '+58 412-2347585',
        },
      },
      body: {},
      footer: {
        cta: {
          link: 'https://coracuero.netlify.app/',
          text: 'Ir a la tienda',
        },
        social: [
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
      },
    },
  };
}

export function merchantTemplateConfig() {
  return {
    subject: 'CCS MultiSport nueva orden - Order ID: %orderId%',
    text: 'CCS MultiSport nueva orden',
    template: {
      preview: 'Caracas Multisport - Nueva orden',
      theme: {
        primary: '#000000',
        primaryTop: '#292929',
        secondary: '#707070',
        secondaryInfo: '#ffffff',
        foreground: '#efeef1',
        info: '#acb5cb',
      },
      header: {
        icon: {
          url: 'https://raw.githubusercontent.com/Novanet-Studio/coracuero-fe/main/static/favicon.png',
          alt: 'Coracuero',
        },
      },
      body: {},
      footer: {
        cta: {
          link: 'https://coracuero-be.herokuapp.com/',
          text: 'Ir al panel',
        },
        copyright: {
          text: '© 2022 Coracuero',
          location: 'Caracas, Venezuela',
        },
      },
    },
  };
}
