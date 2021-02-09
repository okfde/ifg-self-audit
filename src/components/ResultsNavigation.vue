<template>
  <div class="md:flex mt-8 print:hidden">
    <button
      @click="$store.dispatch('previousQuestion')"
      class="btn btn-secondary"
    >
      Zurück
    </button>
    <button @click="restart" class="btn btn-secondary ml-2">
      Neu beginnen
    </button>

    <div class="mt-4 md:mt-0 ml-auto md:flex items-center">
      <span class="mr-4">Ergebnis teilen:</span>
      <button @click="copyLink" class="btn btn-primary">
        <i class="fa fa-link" />
        {{ copied ? 'Link kopiert!' : 'Link kopieren' }}
      </button>
      <button @click="shareMail" class="btn btn-primary ml-2">
        <i class="fa fa-envelope" />
        Per E-Mail versenden
      </button>
      <button @click="print" class="btn btn-primary ml-2">
        <i class="fa fa-print" /> Drucken
      </button>
    </div>
  </div>
</template>

<script>
import copy from 'copy-text-to-clipboard';

export default {
  data() {
    return { copied: false };
  },
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
      this.copied = true;
      window.location.hash = this.$store.getters.persistantUrlData;
      if (!copy(this.$store.getters.permalink)) {
        window.alert(
          'Fehler beim Kopieren des Links. Sie können den Link jedoch auch aus der Adresszeile Ihres Browsers kopieren.'
        );
      }
    },
    shareMail() {
      const { permalink } = this.$store.getters;
      const subject = 'IFG Self Audit';
      const text = `Die Ergebnisse des IFG Self Audits: ${permalink}`;
      const e = encodeURIComponent;
      window.location.href = `mailto:?subject=${e(subject)}&body=${e(text)}`;
    }
  }
};
</script>
