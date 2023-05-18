<template>
  <div class="copyright">
    <p class="copyright__site">
      coracuero.com - {{ new Date().getFullYear() }}
    </p>

    <p class="copyright__payment">
      <span class="copyright__payment-title"
        >Sus pagos están protegidos con:</span
      >
      <a href="https://squareup.com/es/es">
        <img class="w-14" src="/img/square-logo.svg" alt="SquareUp logo" />
      </a>
    </p>

    <p class="copyright__author">
      <span class="copyright__author-text">Tienda realizada por:</span>
      <a href="https://novanet.studio/">
        <img
          class="w-14 mt-2 md:mt-0"
          src="/img/novanet-logo.svg"
          alt="Novanet logo"
        />
      </a>
    </p>
  </div>
</template>

<style scoped>
.copyright {
  @apply py-6 bg-color-5 text-color-2 flex flex-wrap justify-between text-center md:(flex-row justify-around) lg:(justify-between px-14);
}

.copyright__site {
  @apply block w-full mb-0 leading-8 text-sm md:(w-auto my-0);
}

.copyright__payment {
  @apply flex flex-col items-center w-full mb-2 !mt-0 leading-8 text-sm md:(flex-row w-auto mb-0);
}

.copyright__payment-title {
  @apply block text-sm pb-[10px] md:(pb-0 pr-2);
}

.copyright__author {
  @apply flex flex-col items-center justify-center w-full mb-0 leading-8 text-sm md:(w-auto flex-row my-0);
}

.copyright__author-text {
  @apply text-sm md:mr-2;
}
</style>
