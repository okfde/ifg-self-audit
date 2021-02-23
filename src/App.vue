<template>
  <div class="self-audit">
    <SiteHeader />
    <QuestionnaireView />
  </div>
</template>

<script>
import SiteHeader from './components/SiteHeader';
import QuestionnaireView from './components/QuestionnaireView';

export default {
  name: 'App',
  components: { SiteHeader, QuestionnaireView }
};
</script>

<style lang="postcss">
@tailwind base;
@tailwind components;

@screen print {
  .container,
  .row,
  .col-md-8 {
    @apply w-full max-w-none flex-1;
  }
}

.self-audit {
  h2 {
    font-size: 1.75rem !important;
  }

  h3 {
    font-size: 1.25rem !important;
  }

  .btn .fa {
    @apply mr-1;
  }
}

@tailwind utilities;
</style>
