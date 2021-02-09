<template>
  <div class="flex">
    <button @click="restart" class="btn btn-secondary print:hidden mt-4 ml-2">
      Neu beginnen
    </button>

    <div class="ml-auto">
      <button @click="print" class="btn btn-primary print:hidden mt-4">
        Ergebnis drucken
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    print() {
      window.print();
    },
    restart() {
      if (
        window.confirm(
          'Möchten Sie wirklich neu starten? Sie verlieren die eingegebenen Daten.'
        )
      ) {
        this.$store.commit('restart');
      }
    }
  }
};
</script>
