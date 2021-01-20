<template>
  <div class="app">
    <SiteHeader :currentQuestion="currentQuestion" :done="done" />

    <QuestionnaireView
      v-bind="all"
      @next="nextQuestion"
      @previous="previousQuestion"
      @restart="restart"
    />
  </div>
</template>

<script src="./App.js"></script>

<style lang="postcss" scoped>
@import './styles/slide-transition.pcss';
</style>
