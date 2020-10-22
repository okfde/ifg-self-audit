<template>
  <div v-html="body" class="content-container" />
</template>

<script>
export default {
  props: ['body']
};
</script>

<style lang="postcss" scoped>
.content-container >>> {
  h1,
  h2,
  h3,
  p {
    @apply my-2;
  }

  ul {
    @apply list-disc ml-8;

    li {
      @apply mb-1;
    }
  }
}
</style>