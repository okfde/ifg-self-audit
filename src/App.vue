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

<style>
@media print {
  .container,
  .row,
  .col-md-8 {
    width: 100%;
    max-width: none;
    flex: 1;
  }
}

.btn .fa {
  margin-right: 0.25rem;
}
</style>
