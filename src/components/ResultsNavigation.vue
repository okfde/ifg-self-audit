<template>
  <div class="results-navigation">
    <div class="d-flex mt-2 align-items-center">
      <button @click="copyLink" class="btn btn-primary btn-sm w-100">
        <i class="fa fa-link" />
        {{ copied ? 'Link kopiert!' : 'Link kopieren' }}
      </button>
      <button @click="shareMail" class="btn btn-secondary btn-sm ms-2 w-100">
        <i class="fa fa-envelope" />
        Per E-Mail versenden
      </button>
      <button @click="print" class="btn btn-secondary btn-sm ms-2 w-100">
        <i class="fa fa-print" /> Drucken
      </button>
    </div>

    <div class="d-flex mt-2 align-items-center">
      <button
        @click="$store.dispatch('previousQuestion')"
        class="btn btn-secondary btn-sm w-100"
      >
        Zurück
      </button>
      <button @click="restart" class="btn btn-secondary w-100 btn-sm ms-2">
        Neu beginnen
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
    },
    restart() {
      if (
        window.confirm(
          'Möchten Sie wirklich neu starten? Sie verlieren die eingegebenen Daten.'
        )
      ) {
        this.$store.dispatch('restart');
      }
    }
  }
};
</script>

<style scoped>
@media print {
  .results-navigation {
    display: none;
  }
}
</style>
