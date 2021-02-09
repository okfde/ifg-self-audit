<template>
  <div class="flex mt-8 print:hidden">
    <button
      @click="$store.dispatch('previousQuestion')"
      class="btn btn-secondary"
    >
      Zurück
    </button>
    <button @click="restart" class="btn btn-secondary ml-2">
      Neu beginnen
    </button>

    <div class="ml-auto">
      <button @click="copyLink" class="btn btn-primary">
        <i class="fa fa-link" /> Ergebnis kopieren
      </button>
      <button @click="print" class="btn btn-primary ml-2">
        <i class="fa fa-print mr-1" /> Ergebnis drucken
      </button>
    </div>
  </div>
</template>

<script>
import copy from 'copy-text-to-clipboard';

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
    },
    copyLink() {
      copy(this.$store.getters.permalink);
    }
  }
};
</script>
