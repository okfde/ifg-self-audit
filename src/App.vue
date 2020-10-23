<template>
  <div class="app container">
    <SiteHeader :currentQuestion="currentQuestion" />

    <QuestionnaireView
      v-bind="all"
      @next="nextQuestion"
      @previous="previousQuestion"
      @restart="restart"
    />

    <SiteFooter class="mt-auto" />
  </div>
</template>

<script src="./App.js"></script>

<style lang="postcss" scoped>
@import './styles/slide-transition.pcss';

.app {
  @apply flex flex-col min-h-screen max-w-5xl mx-auto py-8 px-4;

  @media print {
    @apply max-w-none p-0;
  }
}
</style>
