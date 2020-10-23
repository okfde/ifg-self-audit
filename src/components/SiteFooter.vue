<template>
  <footer class="print:mt-4 text-sm text-gray-600 md:flex text-center">
    <div>
      Ein Projekt von
      <a href="https://fragdenstaat.de">FragDenStaat</a>.
    </div>

    <div class="links">
      <a href="https://fragdenstaat.de/impressum">Impressum</a>
      <a href="https://github.com/okfde/ifg-self-audit">Quellcode</a>
    </div>
  </footer>
</template>

<style lang="postcss" scoped>
.links {
  @apply ml-auto;

  @apply mt-2;

  @screen md {
    @apply mt-0;
  }

  @media print {
    @apply hidden;
  }
}

.links a {
  &:not(:last-of-type) {
    @apply mb-1;

    @screen lg {
      @apply mb-0;
    }

    &::after {
      content: '/';
      @apply mx-2 text-gray-500 pointer-events-none;
    }
  }
}
</style>
