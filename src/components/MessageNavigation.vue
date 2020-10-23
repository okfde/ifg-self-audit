<template>
  <div class="flex mt-8" v-if="!isSection">
    <button @click="$emit('previous')" class="btn btn-secondary" v-if="!first">
      Zurück
    </button>

    <button @click="$emit('next')" class="btn btn-primary ml-auto">
      Weiter
    </button>
  </div>
</template>

<script>
export default {
  props: ['first']
};
</script>
