<template>
  <div class="app">
    <SiteHeader ref="header" />
    <QuestionnaireView />
  </div>
</template>

<script>
import { ResizeObserver } from '@juggle/resize-observer';

import SiteHeader from './components/SiteHeader';
import QuestionnaireView from './components/QuestionnaireView';

export default {
  name: 'App',
  components: { SiteHeader, QuestionnaireView },
  mounted() {
    this.resize();

    const ro = new ResizeObserver(this.resize);
    ro.observe(document.body);
    document.addEventListener('resize', this.resize);

    this.$store.subscribe(({ type }) => {
      if (type.includes('currentQuestion')) {
        this.$refs.header.scrollIntoView();
      }
    });
  },
  methods: {
    resize() {
      const { offsetHeight } = document.body;
      window.parent.postMessage(
        ['setIframeHeight', 'self-audit-iframe', offsetHeight],
        '*'
      );
    }
  }
};
</script>

<style lang="postcss" scoped>
@import './styles/slide-transition.pcss';
</style>
