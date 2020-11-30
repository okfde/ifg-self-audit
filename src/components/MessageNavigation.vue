<template>
  <div class="flex mt-8" v-if="!isSection">
    <button @click="$emit('previous')" class="btn btn-secondary" v-if="!first">
      Zurück
    </button>

    <button
      @click="$emit('next')" class="btn btn-primary ml-auto"
      :class="{ 'btn-error': error }"
    >
      Weiter
    </button>
  </div>
</template>

<script>
export default {
  props: ['first', 'isSection', 'error']
};
</script>
