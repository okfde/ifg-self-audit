<template>
  <div class="container max-w-5xl mx-auto py-8 px-4 print:max-w-none print:p-0">
    <header class="mb-12 print:mb-4">
      <div class="print:flex">
        <div class="print:ml-auto print:order-2">
          <img src="./assets/logo.svg" class="w-14" />
        </div>
        <h1 class="mt-12 print:mt-0">IFG Self-Audit</h1>
      </div>

      <span v-if="!done">
        Frage {{ answeredQuestions + 1 }} von {{ totalQuestions }}
      </span>
    </header>

    <div class="bg-gray-100 print:bg-transparent">
      <div
        class="h-1 bg-gray-600 transition-all duration-200 ease-out print:hidden"
        :style="{
          width: `${progress}%`
        }"
      />

      <div class="p-8 pt-6 print:px-0">
        <ResultsView
          v-if="done"
          v-bind="resultMessage"
          :totalPoints="totalPoints"
          :questionaire="questionaire"
          :answers="answers"
          @restart="restart"
        />

        <SectionView
          v-else-if="section"
          :section="section"
          @next="nextQuestion"
          @previous="previousQuestion"
        />

        <MessageView
          v-else
          v-bind="question"
          :first="currentQuestion === 0"
          @next="nextQuestion"
          @previous="previousQuestion"
        />
      </div>
    </div>

    <footer class="mt-12 print:mt-4 text-sm text-gray-600 flex">
      <span>
        Ein Projekt von
        <a href="https://fragdenstaat.de">FragDenStaat</a>.
      </span>

      <span class="ml-auto print:hidden">
        <a href="https://fragdenstaat.de/impressum">Impressum</a>
      </span>
    </footer>
  </div>
</template>

<script src="./App.js"></script>
